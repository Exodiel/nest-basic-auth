import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../../shared/constants';

export const IsPublic = () => SetMetadata(PUBLIC_KEY, true);
