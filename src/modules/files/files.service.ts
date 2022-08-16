import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { ApiErrors } from '../../constants/apiErrors';

@Injectable()
export class FilesService {

  throwException() {
    throw new HttpException(ApiErrors.WRITE_FILE, HttpStatus.INTERNAL_SERVER_ERROR)
  }

  async createFile(file: any) : Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, "..", 'static');
      await fs.exists(filePath, async exists => {
        if(!exists) await fs.mkdir(filePath, {recursive: true}, this.throwException);
        await fs.writeFile(path.join(fileName,fileName), file.buffer,this.throwException)
      })
      return  fileName;
    } catch (e) {
      this.throwException()
    }
  }

}
