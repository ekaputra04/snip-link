export interface LinkType {
  id: number;
  slug: string;
  title: string;
  originalUrl: string;
  shortUrl: string;
  is_public: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
