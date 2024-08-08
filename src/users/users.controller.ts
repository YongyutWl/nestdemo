import { Controller, Get, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  @ApiOperation({ summary: "Register a new user" })
  @ApiResponse({
    status: 201,
    description: "The user has been successfully created.",
  })
  @ApiResponse({ status: 400, description: "Bad Request." })
  @ApiBody({
    schema: {
      example: { email: "example@example.com", password: "password123" },
    },
  })
  async register(
    @Body("email") email: string,
    @Body("password") password: string,
  ) {
    return this.usersService.register(email, password);
  }

  @Post("login")
  @ApiOperation({ summary: "Login an existing user" })
  @ApiResponse({ status: 200, description: "Login successful" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiBody({
    schema: {
      example: { email: "example@example.com", password: "password123" },
    },
  })
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
  ) {
    const user = await this.usersService.login(email, password);
    if (user) {
      return { message: "Login successful" };
    } else {
      return { message: "Invalid credentials" };
    }
  }

  @Get("getemailusers")
  @ApiOperation({ summary: "Get all emails of users" })
  @ApiResponse({ status: 200, description: "Get all emails of users" })
  async getEmailUsers() {
    return this.usersService.getEmailUsers();
  }
}
