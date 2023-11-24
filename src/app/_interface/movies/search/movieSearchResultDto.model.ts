import { DataResultDto } from "./DataResultDto.model";

export interface MovieSearchResultDto {
    // list of objects contains movie details
    data: DataResultDto[];
    // total number of movies
    totalResults: number;
}