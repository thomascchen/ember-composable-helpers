import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { A: emberArray, run } = Ember;

moduleForComponent('sort-by', 'Integration | Helper | {{sort-by}}', {
  integration: true
});

test('It sorts by a value', function(assert) {
  this.set('array', emberArray([
    { name: 'c' },
    { name: 'a' },
    { name: 'b' }
  ]));

  this.render(hbs`
    {{~#each (sort-by 'name' array) as |user|~}}
      {{~user.name~}}
    {{~/each~}}
  `);

  assert.equal(this.$().text().trim(), 'abc', 'cab is sorted to abc');
});

test('It watches for changes', function(assert) {
  let array = emberArray([
    { name: 'b' },
    { name: 'a' },
    { name: 'd' }
  ]);

  this.set('array', array);

  this.render(hbs`
    {{~#each (sort-by 'name' array) as |user|~}}
      {{~user.name~}}
    {{~/each~}}
  `);

  run(() => array.pushObject({ name: 'c' }));

  assert.equal(this.$().text().trim(), 'abcd', 'list is still sorted after addition');
});
