export type Tag = string

export interface ICourse {
    id:string;
    bgColor:`#${string}`;
    image:string;
    name:string;
    tags:Tag[]
}