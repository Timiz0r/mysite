---
title: How to fix games on Linux launching on the wrong monitor (if XWayland)
description: Games launching on the wrong monitor has been bothering me since forever...
pubDate: '2025-04-19T08:32:09Z'
cover: './header.png'
tags: [ 'linux', 'random' ]
---

## The problem
Since I switched to Linux full-send however long ago,
a bit of a pain point has been games launching on the wrong monitor.
A good-old <kdb>Win-Shift-Left</kbd> or whatever would work in most cases and just be an annoyance.
In other cases, the game wouldn't render correctly when switching to another monitor.

If you have this problem and are running Wayland, the part of issue is that Proton will launch games through XWayland.
On top of Wayland not having the concept of a primary monitor (if I'm not mistaken),
it's X's concept of primary matter that matters.
As such, an ad-hoc fix is to use `xrandr --output <monitor> --primary` to switch X's primary monitor.

The problem with `xrandr` is that this isn't sticky. I *think* `.xinitrc` works for XWayland, so there's one option.
In my case, my OLED monitor turns off completely after some time of inactivity -- a behavior I'd prefer to keep.
When this happens, the primary monitor switches to my other monitor.
When I turn back on my actually primary monitor, it doesn't switch back.

I've tried finding a quick and easy solution for quite some time, to no avail.
This means we'll have to write our own solution.

## Potential approaches
Feel free to skip this section, since it won't contain a working solution.

In principle, there are a few approaches to take:
* udev rules
* systemd device units
* systemd path units
* A script with an infinite loop (via KDE autostart scripts, in my case)

### systemd device units
[systemd device units](https://www.freedesktop.org/software/systemd/man/latest/systemd.device.html)
are systemd units that trigger whenever a udev `ACTION=="change"` event happens.
By default, GPU devices don't get a systemd device unit.
To add one, we need to create a udev rule that adds a `systemd` tag.

```sh
KERNEL=="card0", SUBSYSTEM=="drm", ACTION=="change", TAG+="systemd"
```

Once this rule runs for the first time, a `dev-dri-card0.device` systemd unit will appear.

This won't work for us, though, because user services can't refer to system units, which includes device units.

### systemd path units
[systemd path units](https://www.freedesktop.org/software/systemd/man/latest/systemd.path.html)
could also hypothetically work.
As one would expect, they trigger when the folder or file pointed to changes.

This was the first thing I tried, actually, and the unit never triggered for me.
They look something like this, incidentally.
```ini
[Unit]
Description=blah blah blah

[Path]
PathChanged=/sys/class/drm/card0

[Install]
WantedBy=default.target
```

It didn't appear to be a permission issue, since some other udev rule gives it `uaccess`,
and other files within that directory didn't work, either.
It's by far the easiest solution if it works, so it may be worth a shot.
In my case, I had to go to plan b.

## Fixing via udev rules
Ultimately, I chose to use udev rules to launch a script.
First, the udev rule:

```sh
# "level" 99- works fine
KERNEL=="card0", SUBSYSTEM=="drm", ACTION=="change", TAG+="systemd", RUN+="/usr/bin/su tim -c '/home/tim/primary-monitor.sh'"
```

Since scripts are run as root, we need to use `su`.
One thing that messed with me for a while is that the full path to `su` needs to be provided.

And our script!

```bash
#!/usr/bin/env bash

monitor="DP-3"

# seem to need some amount of sleep in practice, and 5sec should be more than enough
sleep 5

if [[ -z "$XAUTHORITY" ]]; then
    export XAUTHORITY="~/.Xauthority"
    if [[ ! -f "$XAUTHORITY" ]]; then
        # at least on my distro (I think due to sddm), the file is here
        export XAUTHORITY=$(find /run/user/$(id -u) -maxdepth 1 -iname 'xauth*' 2>/dev/null | head -n 1)
    fi
fi

if [[ -z "$DISPLAY" ]]; then
    export DISPLAY=':0'
fi


xrandr --output "$monitor" --primary
```

The checks to make sure proper `XAUTHORITY` and `DISPLAY` variables are defined are necessary in our case,
since the root user won't have them set, of course.
The `[[ -z ]]` if statements are included to make things a bit simpler if executing in one's own shell,
but they certainly aren't necessary. Feel free to remove these if desired.

In my case, a tricky part was the Xauthority file, which is (probably) generated by SDDM on my machine.
You may need to adjust this for your machine,
and the easiest way to find the path is simply by `printenv`ing to find it!

Be sure to reload the udev rules, as well.

```sh
sudo udevadm control --reload
```

Give things a test by turning off and on your primary monitor,
and running `xrandr` to see if the primary monitor is set correctly.

```sh
xrandr | grep -P "^[^ ]"
```

If it's not working, be sure to check the logs. The log level can also be changed, though I won't cover it here.

```sh
journalctl -u systemd-udevd
```

You might also consider running the script in an empty environment to verify that the extra logic is working.

```sh
env -i bash
./script.sh
```

## Running at logon
The only thing missing with udev rules is running the script the first time on logon.
There are plenty of ways to do it, but why not a systemd user service?

```ini
[Unit]
Description=Fix primary monitor when it comes back

[Install]
WantedBy=default.target

[Service]
ExecStart=%h/OneDrive/scripts/primary-monitor.sh
Type=oneshot
```

Just gotta enable (and run) it!

```sh
systemctl --user enable --now primary-monitor.service
```
