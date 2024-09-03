interface AssetReference {
  _ref: string;
  _type: "reference";
}

interface Image {
  _type: "image";
  asset: AssetReference;
}

export interface Tool {
  name: string;
  logo: Image;
  _key: string;
  _type: "tool";
}

export interface Skill {
  name: string;
  logo: Image;
  _key: string;
  _type: "skill";
}

export interface skillSchema {
  skills: Skill[];
  tools: Tool[];
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
