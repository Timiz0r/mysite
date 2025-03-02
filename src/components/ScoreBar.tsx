import { Progress } from "@/components/ui/progress.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";


type Score = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export const ScoreBar = ({ value }: { value: Score }) => (
  // the popovers are a bit too big, so preferring tooltip.
  // and since tooltips dont trigger on mobile, also adding text.
  <TooltipProvider>
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <div className="h-fill flex gap-2">
          <Progress value={value} max={10} />
          {/* don't know if it's the best way, but setting a large enough basis ensures the progress bar width
                    doesn't change due to the text changing. */}
          <Label className="basis-10">{value}</Label>
        </div>
      </TooltipTrigger>

      <TooltipContent><p>{value}</p></TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
