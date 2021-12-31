import { Test, TestingModule } from '@nestjs/testing';
import { CartitemsService } from './cartitems.service';

describe('CartitemsService', () => {
  let service: CartitemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartitemsService],
    }).compile();

    service = module.get<CartitemsService>(CartitemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
