import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UtilsService {

async encodedPassword(rawPassword: string) {
  const SALT = bcrypt.genSaltSync();
  return await bcrypt.hashSync(rawPassword, SALT);
}
}
