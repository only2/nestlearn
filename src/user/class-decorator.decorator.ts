import { SetMetadata, Controller, applyDecorators, VERSION_NEUTRAL } from '@nestjs/common';

export const UserClassDecorator = (path: string, metaKey: string, metaData: string[]) => {
  return applyDecorators(
    Controller({
      path,
      version: VERSION_NEUTRAL,
    }),
    SetMetadata(metaKey, metaData),
  );
}