import { Request } from '@angular/http';
import { clear, get, set } from 'idb-keyval';

export const BG_SYNC_ALL_TAG = 'BG_SYNC_ALL_TAG';
export const BG_SYNC_UNIQ_TAG = 'BG_SYNC_UNIQ_TAG-';

export interface BgSyncEvent extends Event {
  type: 'sync';
  tag: string;
  waitUntil: (p: PromiseLike<any>) => void;
}

export async function getAllRequestsFor(tag: string) {
  const requests = await get(tag) as string;
  return JSON.parse(requests || '[]') as Request[];
}

export async function setAllRequestsTo(tag: string, requests: Request[]) {
  return await set(tag, JSON.stringify(requests));
}

export async function clearAllRequests() {
  return await clear();
}
