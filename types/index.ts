export type InstructorT = {
  id: string;
  name: string;
  image: string;
  institution: string;
  experience: string;
  createdAt: string;
  updatedAt: string;
};

type PrivateCourse = {
  id: string;
};

export type CourseT = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  shortVideo: string | null;
  price: number;
  oldPrice: number;
  createdAt: string;
  updatedAt: string;
  privateCourses: PrivateCourse;
  instructors: InstructorT[];
  tags?: string[];
};

export type BlogPost = {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  coverImage: string;
  createdAt: string;
  updatedAt: string;
  author?: Author;
};

type Author = {
  name: string;
  image: string;
};
