import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import type { AuthUser } from '../common/roles';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CapturePaypalOrderDto } from './dto/capture-paypal-order.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreatePaypalOrderDto } from './dto/create-paypal-order.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('my')
  findMy(@CurrentUser() user: AuthUser | undefined) {
    return this.paymentsService.findMyPayments(user?.email ?? '');
  }

  @Post('paypal/create-order')
  createPaypalOrder(
    @Body() dto: CreatePaypalOrderDto,
    @CurrentUser() user: AuthUser | undefined,
  ) {
    return this.paymentsService.createPaypalOrder(dto, user);
  }

  @Post('paypal/capture-order')
  capturePaypalOrder(
    @Body() dto: CapturePaypalOrderDto,
    @CurrentUser() user: AuthUser | undefined,
  ) {
    return this.paymentsService.capturePaypalOrder(dto, user);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin')
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get('stats')
  @UseGuards(RolesGuard)
  @Roles('admin')
  getStats() {
    return this.paymentsService.getStats();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('admin')
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() dto: UpdatePaymentDto) {
    return this.paymentsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}
