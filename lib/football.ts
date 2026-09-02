export type Fixture={fixture:{id:number;date:string;status?:{short?:string}};league:{id:number;name:string;country:string};teams:{home:{id:number;name:string;logo?:string;winner?:boolean};away:{id:number;name:string;logo?:string;winner?:boolean}};goals?:{home:number|null;away:number|null}};
export type Prediction={winner?:{id?:number;name?:string;comment?:string};win_or_draw?:boolean;under_over?:string;goals?:{home?:string;away?:string};advice?:string;percent?:{home?:string;draw?:string;away?:string}};
const BASE=process.env.API_FOOTBALL_BASE_URL||"https://v3.football.api-sports.io";
async function api<T>(path:string):Promise<T>{const key=process.env.API_FOOTBALL_KEY;if(!key)throw new Error("API_FOOTBALL_KEY is not configured");const res=await fetch(`${BASE}${path}`,{headers:{"x-apisports-key":key},next:{revalidate:300}});if(!res.ok)throw new Error(`Football API returned ${res.status}`);return res.json()}
export async function getFixtures(date:string,league?:string){const p=new URLSearchParams({date});if(league)p.set("league",league);return api<{response:Fixture[]}>(`/fixtures?${p}`)}
export async function getPrediction(fixtureId:number){return api<{response:Array<{predictions:Prediction}>}>(`/predictions?fixture=${fixtureId}`)}
export function fairOdds(prob:number){return prob>0?1/prob:0}
export function valueScore(prob:number,odds:number){return prob*odds-1}
