import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Modal } from "../../models/modal.model";

@Component({
  selector: "app-modal-box",
  templateUrl: "./modal-box.component.html",
  styleUrls: ["./modal-box.component.less"],
})
export class ModalBoxComponent implements OnInit {
  @Input() modalData: Modal = {
    header: { title: "" },
    body: { text: "" },
    payload: null,
  };
  @ViewChild("mymodal", { static: false }) private mymodal;
  modalRef: NgbModalRef;

  constructor(private ModalService: NgbModal) {}

  ngOnInit(): void {}
  /**
   *
   */
  openModal() {
    this.modalRef = this.ModalService.open(this.mymodal);
    return this.modalRef.result.then(
      (result) => {},
      (reason) => {
        return reason;
      }
    );
  }
}
