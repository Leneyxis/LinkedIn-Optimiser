/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ProfileOptimizationWhereInput } from "./ProfileOptimizationWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ProfileOptimizationOrderByInput } from "./ProfileOptimizationOrderByInput";

@ArgsType()
class ProfileOptimizationFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ProfileOptimizationWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => ProfileOptimizationWhereInput, { nullable: true })
  @Type(() => ProfileOptimizationWhereInput)
  where?: ProfileOptimizationWhereInput;

  @ApiProperty({
    required: false,
    type: [ProfileOptimizationOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [ProfileOptimizationOrderByInput], { nullable: true })
  @Type(() => ProfileOptimizationOrderByInput)
  orderBy?: Array<ProfileOptimizationOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { ProfileOptimizationFindManyArgs as ProfileOptimizationFindManyArgs };
