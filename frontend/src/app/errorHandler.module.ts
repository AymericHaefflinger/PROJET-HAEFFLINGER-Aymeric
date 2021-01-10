import {ErrorHandler} from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
  }
}