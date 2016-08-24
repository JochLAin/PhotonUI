describe("photonui.Helpers", function() {

    describe("escapeHtml", function() {
        it("can escape '<'", function() {
            expect(photonui.Helpers.escapeHtml("<hello<world")).toEqual("&lt;hello&lt;world");
        });

        it("can escape '>'", function() {
            expect(photonui.Helpers.escapeHtml(">hello>world")).toEqual("&gt;hello&gt;world");
        });

        it("can escape '&'", function() {
            expect(photonui.Helpers.escapeHtml("&hello&world")).toEqual("&amp;hello&amp;world");
        });

        it("can escape a mix of '<&>' ", function() {
            expect(photonui.Helpers.escapeHtml("<&><&>")).toEqual("&lt;&amp;&gt;&lt;&amp;&gt;");
        });
    });

    describe("uuid4", function() {
        it("generates an UUID4 conform to RFC4122", function() {
            var uuid4_1 = photonui.Helpers.uuid4();
            var uuid4_2 = photonui.Helpers.uuid4();
            expect(uuid4_1).toMatch(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}/);
            expect(uuid4_2).toMatch(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}/);
            expect(uuid4_1).not.toEqual(uuid4_2);
        });
    });

    describe("numberToCssSize", function() {
        it ("handles a Number as value", function() {
            expect(photonui.Helpers.numberToCssSize(10)).toEqual("10px");
        });

        it ("handles a negative Number as value", function() {
            expect(photonui.Helpers.numberToCssSize(-10)).toEqual("0px");
        });

        it ("handles a floating point Number as value", function() {
            expect(photonui.Helpers.numberToCssSize(10.5)).toEqual("10px");
        });

        it ("handles null as value", function() {
            expect(photonui.Helpers.numberToCssSize(null)).toEqual("auto");
        });

        it ("handles undefined as value", function() {
            expect(photonui.Helpers.numberToCssSize(undefined)).toEqual("auto");
        });

        it ("handles Infinity as value", function() {
            expect(photonui.Helpers.numberToCssSize(Infinity)).toEqual("100%");
        });

        it ("can return a default value", function() {
            expect(photonui.Helpers.numberToCssSize(undefined, 10)).toEqual("10px");
        });

        it ("handles nullValue", function() {
            expect(photonui.Helpers.numberToCssSize(null, undefined, "100%")).toEqual("100%");
        });

        it ("handles nullValue with default value", function() {
            expect(photonui.Helpers.numberToCssSize(undefined, null)).toEqual("auto");
        });

        it ("handles invalid values", function() {
            expect(photonui.Helpers.numberToCssSize("xx", 10)).toEqual("10px");
        });

        it ("handles invalid values in default", function() {
            expect(photonui.Helpers.numberToCssSize("xx", "xx")).toEqual("auto");
        });
    });

});

