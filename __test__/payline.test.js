var Payline = require('../dist/index');

var payline = new Payline('49148860991508', 'q90PRbz8ogRnAxN1ckLP', '1234567');

describe('payline Doauthorization', () => {
    it('DoAuthorization valid one', () => {
        return payline.doAuthorization('1', {
            number: '5555555555554444',
            type: 'MASTERCARD',
            expirationDate: '0822',
            cvx: '234',
            cardholder: 'victor quesnel'
        }, 100, Payline.CURRENCIES.EUR)
            .then((result) => {
                expect(result.transactionId).toEqual(expect.anything());
                return (result);
            })
            .catch((err) => {
                throw (err);
            });
    });
    it('DoAuthorization expirationdate invalid', () => {
        return payline.doAuthorization('2', {
            number: '5105105105105100',
            type: 'MASTERCARD',
            expirationDate: '',
            cvx: '143'
        }, 100, Payline.CURRENCIES.EUR)
            .then((result) => {
                throw (result);
            })
            .catch((err) => {
                expect(err.shortMessage).toEqual(expect.anything());
            });
    });
    it('DoAuthorization cardnumber invalid', () => {
        return payline.doAuthorization('3', {
            number: '5105105105105101',
            type: 'MASTERCARD',
            expirationDate: '0817',
            cvx: '123'
        }, 100, Payline.CURRENCIES.EUR)
            .then((result) => {
                throw (result);
            })
            .catch((err) => {
                expect(err.shortMessage).toEqual(expect.anything());
            });
    });
    it('DoAuthorization cvx invalid', () => {
        return payline.doAuthorization('4', {
            number: '5105105105105100',
            type: 'MASTERCARD',
            expirationDate: '0817',
            cvx: '1'
        }, 100, Payline.CURRENCIES.EUR)
            .then((result) => {
                throw (result);
            })
            .catch((err) => {
                expect(err.shortMessage).toEqual(expect.anything());
            });
    });
    it('DoAuthorization empty field', () => {
        return payline.doAuthorization('5', {
            number: '5105105105105100',
            type: 'MASTERCARD',
            expirationDate: '',
            cvx: '1'
        }, 100, Payline.CURRENCIES.EUR)
            .then((result) => {
                throw (result);
            })
            .catch((err) => {
                expect(err.shortMessage).toEqual(expect.anything());
            });
    });
});

describe('payline DoCapture', () => {
    var originalTimeout;

    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    });
    it('DoCapture Valid', () => {
        return payline.doAuthorization('6', {
            number: '5105105105105100',
            type: 'MASTERCARD',
            expirationDate: '0820',
            cvx: '143'
        }, 100, Payline.CURRENCIES.EUR)
            .then((result) => {
                return new Promise((resolve, reject) => {
                    resolve(payline.doCapture(result.transactionId, 100));
                });
            })
            .then((data) => {
                expect(data.transactionId).toEqual(expect.anything());
                return (data);
            })
            .catch((err) => {
                throw (err);
            });
    });
    it('DoCapture Invalid', () => {
        return payline.doAuthorization('6', {
            number: '5105105105105100',
            type: 'MASTERCARD',
            expirationDate: '0820',
            cvx: '143'
        }, 10, Payline.CURRENCIES.EUR)
            .then((result) => {
                return payline.doCapture('12345678901234', 10);
            })
            .then((data) => {
                throw (data);
            })
            .catch((err) => {
                expect(err.shortMessage).toEqual(expect.anything());
            });
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});

describe('payline DoPurchase', () => {
    it('DoPurchase valid', () => {
        return payline.doPurchase('7', {
            number: '4242424242424242',
            type: 'visa',
            expirationDate: '0820',
            cvx: '143'
        }, 5000, Payline.CURRENCIES.EUR)
            .then((result) => {
                expect(result.transactionId).toEqual(expect.anything());
            })
            .catch((err) => {
                throw (err.shortMessage);
            });
    });
    it('DoPurchase invalid cardnumber', () => {
        return payline.doPurchase('8', {
            number: '412132423423334',
            type: 'visa',
            expirationDate: '0820',
            cvx: '143'
        }, 10, Payline.CURRENCIES.EUR)
            .then((result) => {
                throw (result);
            })
            .catch((err) => {
                expect(err.shortMessage).toEqual(expect.anything());
            });
    });
    it('DoPurchase Invalid expirationDate', () => {
        return payline.doPurchase('9', {
            number: '4242424242424242',
            type: 'visa',
            expirationDate: '0816',
            cvx: '143'
        }, 100, Payline.CURRENCIES.EUR)
            .then((result) => {
                throw (result);
            })
            .catch((err) => {
                expect(err.shortMessage).toEqual(expect.anything());
            });
    });
    it('DoPurchase Invalid cvx', () => {
        return payline.doPurchase('10', {
            number: '4242424242424242',
            type: 'visa',
            expirationDate: '0817',
            cvx: '1'
        }, 100, Payline.CURRENCIES.EUR)
            .then((result) => {
                throw (result);
            })
            .catch((err) => {
                expect(err.shortMessage).toEqual(expect.anything());
            });
    });
});

describe('payline DoRefund', () => {
    beforeEach(() => {
        var originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
    });

    it('DoRefund valid', () => {
        return payline.doPurchase('13', {
            number: '5105105105105100',
            type: 'MASTERCARD',
            expirationDate: '0817',
            cvx: '143'
        }, 100, Payline.CURRENCIES.EUR)
            .then((data) => {
                return payline.doRefund(data.transactionId, 100);
            })
            .then((result) => {
                expect(result.transactionId).toEqual(expect.anything());
            })
            .catch((err) => {
                throw (err);
            });
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});

describe('payline DoCredit', () => {
    it('DoCredit valid', () => {
        return payline.doCredit('11', {
            number: '5105105105105100',
            type: 'MASTERCARD',
            expirationDate: '0817',
            cvx: '1'
        }, 1000, Payline.CURRENCIES.EUR)
            .then((result) => {
                expect(result.transactionId).toEqual(expect.anything());
            })
            .catch((err) => {
                throw (err);
            });
    });
    it('DoCredit invalid cardnumber', () => {
        return payline.doCredit('12', {
            number: '5105105105105122',
            type: 'MASTERCARD',
            expirationDate: '0817',
            cvx: '1'
        }, 1000, Payline.CURRENCIES.EUR)
            .then((result) => {
                throw (result);
            })
            .catch((err) => {
                expect(err.shortMessage).toEqual(expect.anything());
            });
    });
});
