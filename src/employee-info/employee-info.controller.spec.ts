import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeInfoController } from './employee-info.controller';

describe('EmployeeInfoController', () => {
  let controller: EmployeeInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeInfoController],
    }).compile();

    controller = module.get<EmployeeInfoController>(EmployeeInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
