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
    imageUrl: string;
    width: number;
    height: number;
}
