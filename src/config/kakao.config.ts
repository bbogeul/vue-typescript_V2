import { KakaoMapAppKey } from 'environments';

export class KakaoMapLatLonConfig {
  lat: string;
  lon: string;
}
export class KakaoMapConfig {
  appKey: string; // 테스트용 appkey
  center: KakaoMapLatLonConfig;
  level: number;
  mapTypeId: string;
  libraries: string[];
  map: null; // 지도 객체. 지도가 로드되면 할당됨.
}
const map = new KakaoMapConfig();
map.appKey = KakaoMapAppKey.appKey;
