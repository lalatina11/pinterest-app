export type Theme = "dark" | "light" | "system"

export type ThemeProviderProps = {
    children: React.ReactNode
    defaultTheme?: Theme
    storageKey?: string
}

export type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export interface TempItems {
    id: number
    imageUrl: string;
    width: number;
    height: number;
}

export interface Pin {
  _id: string;
  board: string;
  createdAt: string;
  description: string;
  height: number;
  link: string;
  media: string;
  tags: string[];
  title: string;
  updatedAt: string;
  user: string;
  width: number;
  __v: number;
}
