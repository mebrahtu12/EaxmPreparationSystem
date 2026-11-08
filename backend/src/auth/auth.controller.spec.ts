import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import assert from 'node:assert/strict';
import { describe, beforeEach, it } from 'node:test';

void describe('AuthController', () => {
  let controller: AuthController;

  void beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  void it('should be defined', () => {
    assert.ok(controller);
  });
});
