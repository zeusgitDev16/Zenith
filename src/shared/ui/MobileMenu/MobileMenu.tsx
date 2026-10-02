import React from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetHeader, 
  SheetTitle, 
  SheetClose 
} from "@/shared/ui/Sheet/sheet";
import { Button } from "@/shared/ui/Button/Button";
import { handleScrollTo } from "@/shared/helper/navbarSmoothAnchor/handleScrollTo";
import { navigationData } from "@/data/content/navigation.data";
import { Menu } from "lucide-react";

export function MobileMenu(): React.JSX.Element {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-foreground hover:bg-accent/50 cursor-pointer"
            aria-label="Open Menu"
          />
        }
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[300px] sm:w-[350px] flex flex-col justify-between p-6">
        <div>
          <SheetHeader className="text-center items-center justify-center border-b border-border/40 pb-4 mb-6 relative">
  <SheetTitle className="text-lg font-bold tracking-tight text-foreground flex items-center justify-center">
    <SheetClose
      render={
        <button
          type="button"
          onClick={(e) => {
            handleScrollTo(e, "top");
          }}
          className="text-lg font-bold tracking-tight text-foreground flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 inline-flex items-center justify-center"
        />
      }
    >
      <span>{navigationData.brand.name}</span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
    </SheetClose>
  </SheetTitle>
</SheetHeader>

          <nav className="flex flex-col gap-5">
            {navigationData.links.map((link) => (
              <SheetClose 
                key={link.targetId}
                render={
                  <button
                    type="button"
                    className="text-center text-base font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0"
                  />
                }
                onClick={(e) => handleScrollTo(e, link.targetId)}
              >
                {link.label}
              </SheetClose>
            ))}
          </nav>
        </div>

       <div className="flex flex-col gap-3 pt-6 border-t border-border/40">
  <SheetClose 
    render={
      <Button variant="default" className="w-full justify-center" />
    }
  >
    {navigationData.actions.getStarted}
  </SheetClose>
</div>
      </SheetContent>
    </Sheet>
  );
}