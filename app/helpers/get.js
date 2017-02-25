import Ember from 'ember';

export function get([object,param]/*, hash*/) {
  return object.get(param);
}

export default Ember.Helper.helper(get);
