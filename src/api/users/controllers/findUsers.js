import { getDistanceBetweenTwoCoordinates } from "../../../utils/geolocation";

/**
 * This function works but only if every parameter has the expected format
 * Things to improve in a real production environment:
 *   - Check body/query parameters manually or even better with Joi or any
 *     other validation library.
 *   - Move the function that maps a list of objets to return only certain
 *     fields to a utils file in order to be reusable.
 */
const findUsers = (ctx) => {
  const { emailContains, coordinate, radius, fields } = ctx.query;

  /**
   * Thinking in a production environment this piece of code could be moved
   * to a repository or provider in order to be reused and keep the code
   * inside of the controller as small and simple as possible.
   */
  let matchingUsers = ctx.usersDB.filter((user) => {
    let emailMatch = false;
    let coordinateMatch = false;

    if (emailContains) {
      emailMatch =
        user.email.toLowerCase().indexOf(emailContains.toLowerCase()) >= 0;
    }

    if (coordinate && radius) {
      const [lat2, lon2] = coordinate.split(",");
      const { lat: lat1, lng: lon1 } = user.address.geo;
      const distanceFromCoord = getDistanceBetweenTwoCoordinates(
        lat1,
        lon1,
        lat2,
        lon2
      );

      coordinateMatch = distanceFromCoord <= radius;
    }

    return (
      emailMatch ||
      coordinateMatch ||
      (!emailContains && (!coordinate || !radius))
    );
  });

  if (fields) {
    const parsedFields = fields.split(",");

    matchingUsers = matchingUsers.map((user) => {
      let newUser = {};

      for (const property in user) {
        if (parsedFields.includes(property)) {
          newUser[property] = user[property];
        }
      }

      return newUser;
    });
  }

  ctx.body = matchingUsers;
};

export default findUsers;
