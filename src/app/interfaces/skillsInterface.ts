interface AssestReference {
  _ref: string;
  _type: "reference";
}

interface Image {
  assest: AssestReference;
  _type: "image";
}

interface Skill {
  name: string;
  logo: Image;
  key: string;
}

interface Tool {
  name: string;
  logo: Image;
  _key: string;
}

export interface Skills {
  _type: "skill";
  _id: string;
  _updatedAt: string;
  tools: Tool[];
  skills: Skill[];
  _createdAt: string;
  _rev: string;
}
