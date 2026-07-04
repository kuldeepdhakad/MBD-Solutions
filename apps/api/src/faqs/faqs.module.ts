import {
  Body,
  Controller,
  Delete,
  Get,
  Module,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CrudService, CrudConfig } from "../common/crud.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

const config: CrudConfig = {
  model: "fAQ",
  publicListFilter: { status: "PUBLISHED" },
  slugField: undefined,
  searchFields: ["question", "answer"],
  include: undefined,
  auditEntity: "FAQ",
  hasSortOrder: true,
};

@Controller("faqs")
class FaqsController {
  constructor(private crud: CrudService) {}

  @Get()
  findAll(@Query() query: Record<string, string>) {
    return this.crud.findAll(config, query, true);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.crud.findOne(config, id, true);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN", "EDITOR")
  @Post()
  create(@Body() body: any, @CurrentUser() user: any) {
    return this.crud.create(config, body, user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN", "EDITOR")
  @Patch(":id")
  update(@Param("id") id: string, @Body() body: any, @CurrentUser() user: any) {
    return this.crud.update(config, id, body, user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("SUPER_ADMIN", "ADMIN")
  @Delete(":id")
  remove(@Param("id") id: string, @CurrentUser() user: any) {
    return this.crud.remove(config, id, user.id);
  }
}

@Module({
  controllers: [FaqsController],
})
export class FaqsModule {}
