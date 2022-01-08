interface ISubject {
  namePrep: string;
  nameGen: string;
  name: string;
  id: number;
}

interface IArea {
  timeZone: number;
  namePrep: string;
  nameGen: string;
  regionName: string;
  cityName: string;
  name: string;
  id: number;
}

interface IDistricts {
  metroLine: string | null;
  time: number;
  areaId: number;
  verbatimName: string;
  type: number;
  nameWithPrep: string;
  nameLocative: string;
  metroLineColor: string;
  name: string;
  id: number;
}

interface ICity {
  region: string | null;
  namePrep: string | null;
  latitude: number;
  longitude: number;
  zoom: number;
  cityLevel: number;
  areaId: number;
  mappedProperties: any[];
  name: string;
  id: number;
}

interface IFaculty {
  college: ICollege;
  mappedProperties: any[];
  name: string;
  id: number;
}

interface ICollege {
  shortName: string;
  largeName: string;
  city: ICity;
  linkRequired: boolean;
  faculties: any;
  displayName: string;
  cityName: string;
  ordinal: number;
  mappedProperties: any[];
  name: string;
  id: number;
}

interface ILocality {
  name: string;
  id: number;
}

interface IKnowledgeLevels {
  name: string;
  id: number;
}

interface ICategories {
  name: string;
  id: number;
}

interface IInstitution {
  englishName: string | null;
  nativeName: string | null;
  ordinal: number;
  shortName: string;
  institutionType: number;
  number: number | null;
  locality: ILocality;
  isConfirmed: boolean;
  name: string;
  id: number;
}

interface IInstitutionDivision {
  englishName: string | null;
  nativeName: string | null;
  institution: IInstitution;
  divisionType: number;
  isConfirmed: boolean;
  name: string;
  id: number;
}

interface IEducations {
  college: ICollege;
  faculty: IFaculty | null;
  institution: IInstitution;
  institutionDivision: IInstitutionDivision;
  graduationYear: number;
  comments: string;
  speciality: string;
  collegeName: string | null;
  isVerified: boolean;
  id: number;
}

interface IDivisions {
  linkRequired: boolean;
  namePrep: string | null;
  nameGen: string | null;
  orderCount: number;
  serializationDataProvider: null;
  name: string;
  id: number;
}

interface IAdditions {
  linkRequired: boolean;
  nameDative: string | null;
  nameGen: string | null;
  order: number;
}

interface ITeachingSubjects {
  knowledgeLevels: IKnowledgeLevels[];
  subject: ISubject;
  categories: ICategories[];
  divisions: IDivisions[];
  additions: IAdditions[];
  pureComments: string;
  price: number;
  priceExternal: number;
  priceRemote: number;
  categoriesString: string;
  id: number;
}

interface IRepetitor {
  educations: IEducations[];
  teachingPlaces: any[];
  birthDate: string;
  teachingSubjects: ITeachingSubjects[];
  area: IArea;
  experience: number;
  age: number;
  sex: number;
  photoPath: string;
  photoPathLarge: string;
  photoPathSquare: string;
  photoPathSquareLarge: string;
  hasPhoto: boolean;
  hasLargePhoto: boolean;
  hasSquarePhoto: boolean;
  presentationVideoYoutubeId: string;
  status: number;
  statusName: string;
  isHomeLessons: boolean;
  isExternalLessons: boolean;
  isRemoteLessons: boolean;
  lessonDuration: number;
  starRating: number;
  isVerified: boolean;
  isUsingTimeTable: boolean;
  minPricePerHour: number;
  minPricePerHourFiltered: number;
  orderCount: number;
  reviewCount: number;
  firstName: string;
  lastName: string;
  patrName: string;
  id: number;
}
