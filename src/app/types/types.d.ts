export interface Entry {
  _id: string;
  date: string;
  network: string;
  person: string;
  time: number;
}

export interface GroupedEntries {
  [week: string]: Entry[];
}

export interface Person {
  name: string;
  icon: IconType;
}

export interface SocialNetwork {
  name: string;
  icon: IconType;
}
