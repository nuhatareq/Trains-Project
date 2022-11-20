import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toaster: ToastrService) {}
  // helper functions
  showSuccess(msg: string) {
    this.toaster.success(msg);
  }
  showFailure(msg: string) {
    this.toaster.warning(msg);
  }
  showSuccessdelete(msg: string) {
    this.toaster.success(msg);
  }
}
