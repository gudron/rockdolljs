// RockdollJS Backbone Validation
// ---------

import Version from '../version.json';

import Validation from 'backbone-validation';

import _ from 'underscore';

// Validator messages
import CommonMessages from './messages/common';
import InModelMessages from './messages/inModel';
import DateMessages from './messages/date';
import MobilePhoneMessages from './messages/mobilePhone';
import CyrillicMessages from './messages/cyrillic';

// Validator patterns
import DatePatternValidator from './patterns/isoCalendarDate';
import CyrillicPatternValidator from './patterns/cyrillic';
import MobilePhonePatternValidator from './patterns/mobilePhone';

// Validators
import DateValidators from './validators/date';
import inModelValidators from './validators/inModel';

// Formatters
import LabelFormatters from './formatters/labels/label';
import TextFormatters from './formatters/format';

let patterns = _.extend({},
    Validation.patterns,
    CyrillicPatternValidator,
    MobilePhonePatternValidator,
    DatePatternValidator
);

let messages = _.extend({},
    Validation.messages,
    CommonMessages,
    InModelMessages,
    DateMessages,
    MobilePhoneMessages,
    CyrillicMessages
);

let validators = _.extend({},
    Validation.validators,
    DateValidators,
    inModelValidators,
    TextFormatters
);

let labelFormatters = _.extend({},
    LabelFormatters
);


_.extend(Backbone.Validation.patterns, patterns);
_.extend(Backbone.Validation.messages, messages);
_.extend(Backbone.Validation.validators, validators);
_.extend(Backbone.Validation.labelFormatters, labelFormatters);

Backbone.Validation.configure({
    labelFormatter: 'label'
});

export default Validation;