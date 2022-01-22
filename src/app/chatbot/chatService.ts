import { ComponentFactoryResolver, Inject, Injectable } from "@angular/core";

@Injectable()
export class ChatService {
    constructor(@Inject (ComponentFactoryResolver) factoryResolver){
        this.factoryResolver = factoryResolver;
    }
    setRootViewContainerRef(viewContainerRef) {
        this.rootViewContainer = viewContainerRef
      }  addDynamicComponent() {
        const factory = this.factoryResolver
                            .resolveComponentFactory(DynamicComponent)
        const component = factory
          .create(this.rootViewContainer.parentInjector)
        this.rootViewContainer.insert(component.hostView)
      }
}