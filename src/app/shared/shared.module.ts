import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { CdkVirtualScrollViewport, ScrollingModule } from "@angular/cdk/scrolling";
import { TableVirtualScrollModule } from "ng-table-virtual-scroll";
import { MaterialTableComponent } from "./components/material-table/material-table.component";
import { SafeHtmlPipe } from "./pipes/safe-value.pipe";

const DECLARATIONS = [
    MaterialTableComponent,
    SafeHtmlPipe
]   

const SHARED_MODULES = [
    CommonModule,
    MaterialModule,
    ScrollingModule,
    TableVirtualScrollModule,
]

@NgModule({
    declarations: DECLARATIONS,
    imports: SHARED_MODULES,
    exports: [...DECLARATIONS, SHARED_MODULES],
    providers: [CdkVirtualScrollViewport],
})
export class SharedModule { }