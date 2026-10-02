export const handleScrollTo = (e: React.MouseEvent<HTMLElement>, targetId: string): void => {
  e.preventDefault();
  console.log("Navbar link clicked for target:", targetId);

  const element = document.getElementById(targetId);
  if (!element) {
    console.error("Target element not found with ID:", targetId);
    return;
  }

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition - 80; // 80px offset for navbar
  const duration = 500; // seconds duration
  let startTime: number | null = null;

  console.log("Starting scroll animation. Distance:", distance);

  const animation = (currentTime: number): void => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const ease = (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    window.scrollTo(0, startPosition + (distance * ease(progress)));

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      console.log("Scroll animation completed.");
    }
  };

  requestAnimationFrame(animation);
};