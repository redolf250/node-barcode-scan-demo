
import * as turf from '@turf/turf';

function checkAccess(userLat, userLng, buildingCoords, outdoorRadiusMeters) {
  const userPoint = turf.point([userLng, userLat]);

  // Build the polygon from your stored coordinates
  const buildingPolygon = turf.polygon([
    buildingCoords.map(p => [p.lng, p.lat])
  ]);

  // Buffer the polygon outward by X meters (handles corners!)
  const outerZone = turf.buffer(buildingPolygon, outdoorRadiusMeters, {
    units: 'meters'
  });

  const insideBuilding = turf.booleanPointInPolygon(userPoint, buildingPolygon);
  const insideOuterZone = turf.booleanPointInPolygon(userPoint, outerZone);

  if (insideBuilding) {
    return { allowed: true, zone: 'inside' };
  } else if (insideOuterZone) {
    return { allowed: true, zone: 'outside-buffer' };
  } else {
    return { allowed: false, zone: 'out-of-range' };
  }
}