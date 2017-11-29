import {Container} from 'inversify';
import {interactors} from '../interactors/index';
import {ConfigGetInteractorMock} from './interactors/config-get.interactor.mock';

export function configure(ioc: Container) {
  ioc
    .bind(interactors.ConfigGet)
    .to(ConfigGetInteractorMock)
    .inRequestScope();
}
