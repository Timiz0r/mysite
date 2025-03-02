---
title: 'Reboot directly to Windows from Linux, skipping UEFI boot manager'
description: 'Unattended!'
pubDate: '2025-03-02T00:29:56Z'
cover: './header.png'
---

## winyeet
A quick little post!

I use Linux 90% of the time. Arch btw.
However, [due to an incompatibility between the NVIDIA Linux driver and my VR headset](https://forums.developer.nvidia.com/t/bigscreen-beyond-hmd-unable-to-be-initialized-on-nvidia-possibly-due-to-dsc-bpp-issue/294108/1), 
I find myself rebooting into Windows often.
Rebooting takes a bit of time because DDR5 (well, several seconds more than I prefer),
and I often take the time to use prepare to enter VR, use the bathroom, make tea, etc.
If I miss the boot manager's timer to switch to a different OS, though, I end up right where I started and need to reboot again to get to Windows.

In comes `efibootmgr`!

```bash
#!/usr/bin/env bash

boot_num=$(efibootmgr | grep -Po '^Boot\K\d+(?=\* Windows Boot Manager)')
sudo efibootmgr -n $boot_num
sudo reboot
```

With a bonus `sudo ln -s winyeet.sh /usr/local/bin/winyeet` (or really I should finally get around to making a folder full of random scripts added to PATH), I can quickly reboot into Windows completely unattended!

Also a quick note that the above `grep` regex requires a `grep` supporting PCRE. Otherwise, one will need a different implementation.