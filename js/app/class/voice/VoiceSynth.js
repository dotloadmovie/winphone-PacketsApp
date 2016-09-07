define(['jquery', 'backbone', 'class/Class'],

    function ($, Backbone, AbstractClass) {

        var VoiceSynth = AbstractClass.extend({

            stopAllPlayBack: false,
            currentArticle: '',

            initialize: function () {

                this.audio = new Audio();
                this.audio.autoplay = true;
                this.start = Date.now();

            },

            playVoice: function (article) {

                this.currentArticle = article;

                this.synth = Windows.Media.SpeechSynthesis.SpeechSynthesizer();

                this.synth.synthesizeTextToStreamAsync(article).then(_.bind(function (markersStream) {

                    if (this.stopAllPlayBack || article !== this.currentArticle) {

                        return;
                    }

                    var blob = MSApp.createBlobFromRandomAccessStream(markersStream.ContentType, markersStream);
                    this.audio.src = URL.createObjectURL(blob, { oneTimeOnly: true });
                    markersStream.seek(0); //start at beginning when speak is hit
                    this.audio.AutoPlay = Boolean(true);

                   
                    //audio on completed
                    this.audio.onended = _.bind(function () {
                        this.playComplete();
                    }, this);

                    this.audio.play();

                }, this));

                this.stopAllPlayBack = false;

            },

            stopVoice: function () {

                this.stopAllPlayBack = true;

                this.synth = null;
                delete this.synth;

                this.audio.pause();
                this.audio.src = null;

            },

            playComplete: function () {

                $('body').trigger('VOICE_SYNTH_COMPLETE');

                this.stopVoice();

            }

        });

        return VoiceSynth;

    }
);