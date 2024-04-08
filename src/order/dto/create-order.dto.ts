import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty()
	readonly title: string
    
    @ApiProperty()
	readonly adress: string

    @ApiProperty()
	readonly adressee_name: string

    @ApiProperty()
	readonly phone: string

    @ApiProperty()
	readonly time: string

    @ApiProperty()
	readonly comment: string
}
