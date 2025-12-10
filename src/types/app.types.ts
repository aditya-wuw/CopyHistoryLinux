
export type TabItem = {
  label: string;      
  icon?: React.ReactNode; 
};

export interface history {
    "id":string,
    "item":string
}

export interface shortcuts { 
    shortcut : string,
    action : () => void | Promise<void>;
}

export interface Emojies{
    label : string,
    type: string
    emoji : string,
    keywords : string[]
}