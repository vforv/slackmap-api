import {expect, Test} from '@slackmap/testing';
import {DataMockModule} from '@slackmap/data-mock';
import {UserGateway} from '@slackmap/data';
import {UserEntity} from '@slackmap/data';

describe('UserGateway MOCK', () => {
  let gateway: UserGateway;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      modules: [DataMockModule]
    }).compile();

    gateway = module.select(DataMockModule).get<UserGateway>(UserGateway);
  });

  it('should find one', async () => {
    const res = await gateway.find({
      facebook_id: '1234567890'
    });
    expect(res).to.have.any.keys('rid', 'facebook_id');
    expect(res.facebook_id).to.equal('1234567890');
  });
  it('should find all', async () => {
    const res = await gateway.findAll({
      facebook_id: '1234567890'
    });
    expect(res).to.be.an('array');
    expect(res[0].facebook_id).to.equal('1234567890');
  });
});
