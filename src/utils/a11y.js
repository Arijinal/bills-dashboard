/**
 * a11y — small keyboard-activation helper for non-button clickable elements.
 *
 * Use on inline elements (<span>, <li>) that must remain inline-display but
 * still be keyboard-activatable. Pair with role="button" and tabIndex={0}.
 *
 * Example:
 *   <span
 *     role="button"
 *     tabIndex={0}
 *     onClick={handleClick}
 *     onKeyDown={onKeyboardActivate(handleClick)}
 *   >player name</span>
 */
export const onKeyboardActivate = (onClick) => (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick(e);
  }
};
