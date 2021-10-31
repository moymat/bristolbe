export const CHANGE_COLOR = 'CHANGE_COLOR';
export const CHANGE_DIRECTION = 'CHANGE_DIRECTION';

// un action creator ! une fonction qui fabrique une action
export const createChangeDirectionAction = (angle) => ({
  type: CHANGE_DIRECTION,
  angle: `${angle}deg`,
});