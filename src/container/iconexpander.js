/*
 * Copyright (c) 2014-2016, Wanadev <http://www.wanadev.fr/>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   * Redistributions of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *   * Neither the name of Wanadev nor the names of its contributors may be used
 *     to endorse or promote products derived from this software without specific
 *     prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Authored by: Jocelyn FAIHY
 */

/**
 * PhotonUI - Javascript Web User Interface.
 *
 * @module PhotonUI
 * @submodule Expander
 * @namespace photonui
 */

 var Helpers = require("../helpers.js");
 var Expander = require("./expander.js");

IconExpander = Expander.$extend({
    // Constructor
    __init__: function (params) {
        this.$super(params);
    },

    //////////////////////////////////////////
    // Properties and Accessors             //
    //////////////////////////////////////////
    // ====== Public properties ======

    /**
     * The fontawesome class icon for folded state
     *
     * @property iconFolded
     * @type String
     * @default "fa-caret-right"
     */
    _iconFolded: 'fa-caret-right',
    getIconFolded: function () {
        "@phontui-update";
        return this._iconFolded;
    },
    setIconFolded: function (icon) {
        this._iconFolded = icon;
    },

    /**
     * The fontawesome class icon for unfolded state
     *
     * @property iconUnfolded
     * @type String
     * @default "fa-caret-down"
     */
    _iconUnfolded: 'fa-caret-down',
    getIconUnfolded: function () {
        "@phontui-update";
        return this._iconUnfolded;
    },
    setIconUnfolded: function (icon) {
        this._iconUnfolded = icon;
    },

    setTitle: function (title) {
        this._title = title;
        Helpers.cleanNode(this.__html.titleContent);
        this.__html.titleContent.appendChild(document.createTextNode(title));
    },

    // Update icon on change foded state
    setFolded: function (folded) {
        this._folded = folded;

        if (this._folded) {
            this.__html.content.style.display = "none";
            this.addClass("photonui-iconexpander-folded");
            this.__html.icon.className = 'photonui-iconexpander-title-icon fa ' + this.iconFolded;
        } else {
            this.__html.content.style.display = "block";
            this.removeClass("photonui-iconexpander-folded");
            this.__html.icon.className = 'photonui-iconexpander-title-icon fa ' + this.iconUnfolded;
        }
    },

    // ====== Private methods ======

    /**
     * Build the widget HTML.
     *
     * @method _buildHtml
     * @private
     */
    _buildHtml: function () {
        this.__html.outer = document.createElement("div");
        this.__html.outer.className = "photonui-widget photonui-iconexpander";

        this.__html.title = document.createElement("div");
        this.__html.title.className = "photonui-iconexpander-title";
        this.__html.title.tabIndex = "0";
        this.__html.outer.appendChild(this.__html.title);

        this.__html.icon = document.createElement('span');
        this.__html.icon.className = 'photonui-iconexpander-title-icon fa ' + this.iconFolded;
        this.__html.title.appendChild(this.__html.icon);
        this.__html.title.appendChild(document.createTextNode('\u00A0'));

        this.__html.titleContent = document.createElement('span');
        this.__html.titleContent.className = "photonui-iconexpander-title-content";
        this.__html.title.appendChild(this.__html.titleContent);

        this.__html.content = document.createElement("div");
        this.__html.content.className = "photonui-container photonui-iconexpander-content";
        this.__html.outer.appendChild(this.__html.content);
    },
});

module.exports = IconExpander;
