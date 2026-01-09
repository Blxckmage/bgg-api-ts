import type { OneOrNothing, ThingType } from "./Types";

export interface BggThing {
  items: {
    total: number;
    termsofuse: string;
    item: BggThingItem[];
  };
}

export interface BggThingItem {
  id: number;
  type: ThingType;
  name: BggThingName[];
  yearpublished: number;
  description: string;
  minplayers: number;
  maxplayers: number;
  playingtime: number;
  minplaytime: number;
  maxplaytime: number;
  minage: number;
  poll?: BggThingPoll[];
  link?: BggThingLink[];
  statistics?: BggThingStatistics;
  image?: string;
  thumbnail?: string;
  videos?: any; // TODO: Complex structure, implement when needed
  marketplace?: any; // TODO: Complex structure, implement when needed
  comments?: any; // TODO: Complex structure, implement when needed
}

export interface BggThingName {
  type: "primary" | "alternate";
  value: string;
}

export interface BggThingPoll {
  name: string;
  title: string;
  totalvotes?: number;
  results: BggThingPollResults[];
}

export interface BggThingPollResults {
  numplayers?: number;
  result: BggThingPollResult[];
}

export interface BggThingPollResult {
  value: string;
  numvotes: number;
  level?: number;
}

export interface BggThingPollResults {
  numplayers?: number;
  result: BggThingPollResult[];
}

export interface BggThingLink {
  type: string;
  id: number;
  value: string;
}

export interface BggThingStatistics {
  page: number;
  ratings: BggThingRatings;
  period?: BggThingPeriod;
}

export interface BggThingRatings {
  usersrated: number;
  average: number;
  bayesaverage: number;
  ranks: {
    rank: BggThingRank[];
  };
  stddev: number;
  median: number;
  truncated: number;
}

export interface BggThingRank {
  type: "subtype" | "family";
  id: number;
  name: string;
  friendlyname: string;
  value: number;
  bayesaverage: number;
}

export interface BggThingPeriod {
  poll: BggThingPoll;
}

export interface BggThingParams {
  id: string | number;
  type?: string;
  versions?: OneOrNothing;
  videos?: OneOrNothing;
  stats?: OneOrNothing;
  historical?: OneOrNothing;
  marketplace?: OneOrNothing;
  comments?: OneOrNothing;
  ratingcomments?: OneOrNothing;
  page?: number;
  pagesize?: number;
}
