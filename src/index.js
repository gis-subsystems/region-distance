// LAT,LNG
// https://www.openstreetmap.org/directions?engine=graphhopper_foot&route=51,19%3B51,20
export const AVERAGED_KMS_PER_ONE_DEGREE_IN_REGION_CEST_WGS84_LNG = 85 /* Measure.of(85e3, meters); */
// https://www.openstreetmap.org/directions?engine=graphhopper_foot&route=50,19%3B51,19
export const AVERAGED_KMS_PER_ONE_DEGREE_IN_REGION_CEST_WGS84_LAT = 132

export async function getCoordsByPostcode(postCode: string) {
  const [prefix,] = (postCode || '').split('-') ?? [];
  /*@inject-ts
  type defaultRegionData = {
    [k: string]: ["PL","00-010","Warszawa","Mazovia","78","Warszawa","1465","Warsaw","146501","52.234","21.0103","6"],
  }
  */
  const regionData = await require(`PL/min/${prefix}.json`) /*@inject-ts as defaultRegionData;*/
  console.log('region data', regionData[postCode])
  const [wgs84lat, wgs84lon] = [regionData[postCode][9], regionData[postCode][10]]
  return [wgs84lat, wgs84lon] /*@inject-ts as unknown as ([number, number])*/
}

export function calculateDistance([x, y]/*@inject-ts: Array<number>*/, [destX, destY]/*@inject-ts: Array<number>*/) {
  if (!([x, destX].every(x => x >= 49 && x <= 54) && [y, destY].every(x => y >= 14 && x <= 24))) {
    console.warn('wont work for these coorinates', arguments)
  }
  // Math.abs is *not* needed in euclidian geometry distnace
  const dx = (destX - x) * AVERAGED_KMS_PER_ONE_DEGREE_IN_REGION_CEST_WGS84_LAT
  const dy = (destY - y) * AVERAGED_KMS_PER_ONE_DEGREE_IN_REGION_CEST_WGS84_LNG
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}
