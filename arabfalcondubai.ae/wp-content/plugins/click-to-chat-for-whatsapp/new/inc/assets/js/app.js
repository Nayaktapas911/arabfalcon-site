(() => {
    var e;
    (e = jQuery)(function() {
        var t = window.location.href,
            c = void 0 !== document.title ? document.title : "",
            n = "no",
            a = document.querySelector(".ht-ctc-chat");
        try {
            n = void 0 !== navigator.userAgent && navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) ? "yes" : "no"
        } catch (e) {}
        "no" == n && (n = void 0 !== screen.width && screen.width > 1025 ? "no" : "yes");
        var o = {};

        function r() {
            localStorage.getItem("ht_ctc_storage") && (o = localStorage.getItem("ht_ctc_storage"), o = JSON.parse(o))
        }

        function _(e) {
            return !!o[e] && o[e]
        }

        function i(e, t) {
            r(), o[e] = t;
            var c = JSON.stringify(o);
            localStorage.setItem("ht_ctc_storage", c)
        }
        r();
        var s = {},
            l = {};

        function u() {
            var t = document.querySelector(".ht_ctc_chat_data");
            t && t.remove(), document.dispatchEvent(new CustomEvent("ht_ctc_event_settings", {
                    detail: {
                        ctc: s
                    }
                })),
                function() {
                    if (a) {
                        document.dispatchEvent(new CustomEvent("ht_ctc_event_chat")),
                            function(e) {
                                s.schedule && "yes" == s.schedule ? document.dispatchEvent(new CustomEvent("ht_ctc_event_display", {
                                    detail: {
                                        ctc: s,
                                        display_chat: g,
                                        ht_ctc_chat: e,
                                        online_content: f
                                    }
                                })) : (g(e), f())
                            }(a), a.addEventListener("click", function() {
                                document.querySelector(".ht_ctc_chat_greetings_box") || b(a)
                            }),
                            function() {
                                if (a) {
                                    var e = document.querySelector(".ht_ctc_chat_greetings_box");
                                    e && a.addEventListener("click", function(t) {
                                        t.target.closest(".ht_ctc_chat_style") && (e.classList.contains("ctc_greetings_opened") ? v("user_closed") : d("user_opened"))
                                    }), a.addEventListener("click", function(e) {
                                        e.target.closest(".ctc_greetings_close_btn") && v("user_closed")
                                    })
                                }
                            }(), a && a.addEventListener("click", function(e) {
                                if (e.target.closest(".ht_ctc_chat_greetings_box_link")) {
                                    e.preventDefault();
                                    var t = document.querySelector("#ctc_opt");
                                    if (t)
                                        if (t.checked || _("g_optin")) b(a), h();
                                        else {
                                            var c = document.querySelector(".ctc_opt_in");
                                            c && (c.style.display = "block", c.style.opacity = "0", setTimeout(function() {
                                                c.style.transition = "opacity 0.4s", c.style.opacity = "1"
                                            }, 10))
                                        }
                                    else b(a), h();
                                    document.dispatchEvent(new CustomEvent("ht_ctc_event_greetings"))
                                }
                            });
                        var e = document.querySelector("#ctc_opt");
                        e && e.addEventListener("change", function() {
                            if (e.checked) {
                                var t = document.querySelector(".ctc_opt_in");
                                t && (t.style.transition = "opacity 0.1s ease-out", t.style.opacity = "0", setTimeout(function() {
                                    t.style.display = "none"
                                }, 100)), i("g_optin", "y"), setTimeout(function() {
                                    b(a), h()
                                }, 500)
                            }
                        })
                    }
                }(), e(document).on("click", ".ht-ctc-sc-chat", function() {
                    b(this)
                }), document.addEventListener("click", function(e) {
                    var t = e.target.closest(".ctc_chat, #ctc_chat");
                    t && (b(t), t.classList.contains("ctc_woo_place") && e.preventDefault());
                    var c = e.target.closest('[href="#ctc_chat"]');
                    c && (e.preventDefault(), b(c))
                })
        }

        function d() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "open";
            y();
            var c = document.querySelector(".ht-ctc-chat .ctc_cta_stick");
            c && c.remove();
            var n = document.querySelector(".ht_ctc_chat_greetings_box");
            n && ("init" == t ? e(".ht_ctc_chat_greetings_box").show(70) : e(".ht_ctc_chat_greetings_box").show(400), n.classList.add("ctc_greetings_opened"), n.classList.remove("ctc_greetings_closed")), i("g_action", t), "user_opened" == t && i("g_user_action", t),
                function() {
                    if (document.querySelector(".ctc_greetings_modal") && !document.querySelector(".ht_ctc_modal_backdrop")) {
                        var e = function(t) {
                                "Escape" === t.key && (v("user_closed"), document.removeEventListener("keydown", e))
                            },
                            t = document.createElement("div");
                        t.className = "ht_ctc_modal_backdrop", document.body.appendChild(t), t.addEventListener("click", function() {
                            v("user_closed")
                        }), document.addEventListener("keydown", e)
                    }
                }()
        }

        function h() {
            m(), setTimeout(function() {
                v("chat_clicked")
            }, 500)
        }

        function v() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "close";
            m(), "element" == t ? e(".ht_ctc_chat_greetings_box").hide(70) : e(".ht_ctc_chat_greetings_box").hide(400);
            var c = document.querySelector(".ht_ctc_chat_greetings_box");
            c && (c.classList.add("ctc_greetings_closed"), c.classList.remove("ctc_greetings_opened")), i("g_action", t), "user_closed" == t && i("g_user_action", t)
        }

        function m() {
            var e = document.querySelector(".ht_ctc_modal_backdrop");
            e && e.remove()
        }

        function g(e) {
            var t;
            "yes" == n ? "show" == s.dis_m && ((t = document.querySelector(".ht_ctc_desktop_chat")) && t.remove(), e.style.cssText = s.pos_m + s.css, p(e)) : "show" == s.dis_d && ((t = document.querySelector(".ht_ctc_mobile_chat")) && t.remove(), e.style.cssText = s.pos_d + s.css, p(e))
        }

        function p(t) {
            try {
                e(t).show(parseInt(s.se))
            } catch (e) {
                t.style.display = "block"
            }! function() {
                var e = document.querySelector(".ht_ctc_chat_greetings_box");
                if (e) {
                    if (s.g_device) {
                        if ("yes" !== n && "mobile" === s.g_device) return void e.remove();
                        if ("yes" === n && "desktop" === s.g_device) return void e.remove()
                    }
                    document.dispatchEvent(new CustomEvent("ht_ctc_event_after_chat_displayed", {
                        detail: {
                            ctc: s,
                            greetings_open: d,
                            greetings_close: v
                        }
                    })), s.g_init && "user_closed" !== _("g_user_action") && ("default" === s.g_init ? "yes" !== n && d("init") : "open" === s.g_init && d("init"));
                    var t = document.querySelectorAll('.ctc_greetings, #ctc_greetings, .ctc_greetings_now, [href="#ctc_greetings"]');
                    t.length > 0 && t.forEach(function(e) {
                        e.addEventListener("click", function(e) {
                            e.preventDefault(), v("element"), d("element")
                        })
                    })
                }
            }(),
            function() {
                if (document.querySelector(".ht_ctc_notification") && "stop" !== _("n_badge")) {
                    var t = document.querySelector(".ctc_nb");
                    if (t) {
                        var c = t.closest(".ht_ctc_style"),
                            n = document.querySelector(".ht_ctc_badge");
                        if (c && n) {
                            var a, o, r = null === (a = c.querySelector(".ctc_nb")) || void 0 === a ? void 0 : a.getAttribute("data-nb_top"),
                                i = null === (o = c.querySelector(".ctc_nb")) || void 0 === o ? void 0 : o.getAttribute("data-nb_right");
                            null !== r && (n.style.top = r), null !== i && (n.style.right = i)
                        }
                    }
                    var l = s.n_time ? 1e3 * s.n_time : 150;
                    setTimeout(function() {
                        e(".ht_ctc_notification").show(400)
                    }, l)
                }
            }(),
            function(t) {
                var c = t.classList.contains("ht_ctc_entry_animation") ? 1200 : 120;
                setTimeout(function() {
                    t.classList.add("ht_ctc_animation", s.ani)
                }, c), e(".ht-ctc-chat").hover(function() {
                    e(".ht-ctc-chat .ht-ctc-cta-hover").show(120)
                }, function() {
                    e(".ht-ctc-chat .ht-ctc-cta-hover").hide(100)
                })
            }(t)
        }

        function f() {
            document.querySelector(".for_greetings_header_image_badge") && (document.querySelectorAll(".for_greetings_header_image_badge").forEach(function(e) {
                e.classList.add("g_header_badge_online")
            }), e(".for_greetings_header_image_badge").show())
        }

        function y() {
            var e = document.querySelector(".ht_ctc_notification");
            e && (i("n_badge", "stop"), e.remove())
        }

        function b(a) {
            document.dispatchEvent(new CustomEvent("ht_ctc_event_number", {
                detail: {
                    ctc: s
                }
            }));
            var o = s.number,
                r = s.pre_filled;
            if (a.hasAttribute("data-number") && "" !== a.getAttribute("data-number") && (o = a.getAttribute("data-number")), a.hasAttribute("data-pre_filled")) {
                var _ = a.getAttribute("data-pre_filled") || "";
                r = (s.prefix_pre_filled ? s.prefix_pre_filled : "") + _
            }
            try {
                r = r.replaceAll("%", "%25");
                var i = window.location.href;
                r = r.replace(/\[url]/gi, i), r = encodeURIComponent(decodeURI(r))
            } catch (e) {}
            if ("" != o || s.custom_url_m && "" !== s.custom_url_m || s.custom_url_d && "" !== s.custom_url_d) {
                var u = "https://wa.me/" + o + "?text=" + r,
                    d = s.url_target_d ? s.url_target_d : "_blank";
                "yes" == n ? (s.url_structure_m && "wa_colon" == s.url_structure_m && (u = "whatsapp://send?phone=" + o + "&text=" + r, d = "_self"), s.custom_url_m && "" !== s.custom_url_m && (u = s.custom_url_m)) : (s.url_structure_d && "web" == s.url_structure_d && (u = "https://web.whatsapp.com/send?phone=" + o + "&text=" + r), s.custom_url_d && "" !== s.custom_url_d && (u = s.custom_url_d));
                var h = "popup" == d ? "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=788,height=514,left=100,top=100" : "noopener";
                window.open(u, d, h), s.chat_number = o,
                    function() {
                        if (s.analytics && "session" == s.analytics) {
                            if (sessionStorage.getItem("ht_ctc_analytics")) return;
                            sessionStorage.setItem("ht_ctc_analytics", "done")
                        }

                        function e(e) {
                            var n = s.chat_number && "" !== s.chat_number ? s.chat_number : s.number;
                            try {
                                document.dispatchEvent(new CustomEvent("ht_ctc_event_apply_variables", {
                                    detail: {
                                        v: e
                                    }
                                })), e = (e = (e = (e = void 0 !== window.apply_variables_value ? window.apply_variables_value : e).replace("{number}", n)).replace("{title}", c)).replace("{url}", t)
                            } catch (e) {}
                            return e
                        }
                        var n;
                        n = "event_" + Math.floor(1e4 + 9e4 * Math.random()), s.ctc_pixel_event_id = n, document.dispatchEvent(new CustomEvent("ht_ctc_event_analytics"));
                        var a = s.chat_number && "" !== s.chat_number ? s.chat_number : s.number,
                            o = {},
                            r = "Click to Chat for WhatsApp",
                            _ = "chat: " + a,
                            i = c + ", " + t;
                        if (s.ga) {
                            var u = s.g_an_event_name && "" !== s.g_an_event_name ? s.g_an_event_name : "click to chat";
                            u = e(u), l.g_an_params && l.g_an_params.forEach(function(t) {
                                if (l[t]) {
                                    var c = l[t],
                                        n = c.key,
                                        a = c.value;
                                    n = e(n), a = e(a), o[n] = a
                                }
                            });
                            var d = 0,
                                h = "no";
                            if ("undefined" != typeof dataLayer) try {
                                var v = function(e) {
                                    e = e.toUpperCase(), m.includes(e) || (m.push(e), (e.startsWith("G-") || e.startsWith("GT-")) && (o.send_to = e, gtag("event", u, o), d++))
                                };
                                "undefined" == typeof gtag && (window.gtag = function() {
                                    dataLayer.push(arguments)
                                }, h = "yes");
                                var m = [];
                                if (window.google_tag_data && window.google_tag_data.tidr && window.google_tag_data.tidr.destination)
                                    for (var g in window.google_tag_data.tidr.destination) v(g);
                                dataLayer.forEach(function(e) {
                                    "config" == e[0] && e[1] && (g = e[1], v(g))
                                })
                            } catch (e) {}
                            0 == d && "no" == h && ("undefined" != typeof gtag ? gtag("event", u, o) : "undefined" != typeof ga && void 0 !== ga.getAll ? ga.getAll()[0].send("event", r, _, i) : "undefined" != typeof __gaTracker && __gaTracker("send", "event", r, _, i))
                        }
                        if ("undefined" != typeof dataLayer && dataLayer.push({
                                event: "Click to Chat",
                                type: "chat",
                                number: a,
                                title: c,
                                url: t,
                                event_category: r,
                                event_label: i,
                                event_action: _,
                                ref: "dataLayer push"
                            }), s.ads && "undefined" != typeof gtag_report_conversion && gtag_report_conversion(), s.fb && "undefined" != typeof fbq) {
                            var p = s.pixel_event_name && "" !== s.pixel_event_name ? s.pixel_event_name : "Click to Chat by HoliThemes",
                                f = l.pixel_event_type && "" !== l.pixel_event_type ? l.pixel_event_type : "trackCustom",
                                y = {};
                            l.pixel_params && l.pixel_params.forEach(function(t) {
                                if (l[t]) {
                                    var c = l[t],
                                        n = c.key,
                                        a = c.value;
                                    n = e(n), a = e(a), y[n] = a
                                }
                            }), s.ctc_pixel_event_id = "", fbq(f, p, y, {
                                eventID: n
                            })
                        }
                    }(),
                    function(t) {
                        if (s.hook_url) {
                            var c = {};
                            if (s.hook_v) {
                                c = void 0 !== k ? k : s.hook_v;
                                var n = {},
                                    a = 1;
                                c.forEach(function(e) {
                                    n["value" + a] = e, a++
                                }), s.hook_v = n
                            }
                            document.dispatchEvent(new CustomEvent("ht_ctc_event_hook", {
                                detail: {
                                    ctc: s,
                                    number: t
                                }
                            }));
                            var o = s.hook_url;
                            if (c = s.hook_v, s.webhook_format && "json" == s.webhook_format) var r = c;
                            else r = JSON.stringify(c);
                            e.ajax({
                                url: o,
                                type: "POST",
                                mode: "no-cors",
                                data: r,
                                success: function(e) {}
                            })
                        }
                    }(o), y()
            } else if (s.no_number) {
                var v = document.querySelector(".ctc-no-number-message");
                v && (v.style.display = "block")
            }
        }
        "undefined" != typeof ht_ctc_chat_var && (s = ht_ctc_chat_var), "undefined" != typeof ht_ctc_variables && (l = ht_ctc_variables), 0 === Object.keys(s).length || 0 === Object.keys(l).length ? function() {
            if (0 === Object.keys(s).length && document.querySelector(".ht_ctc_chat_data")) try {
                var e, t = (null === (e = document.querySelector(".ht_ctc_chat_data")) || void 0 === e ? void 0 : e.getAttribute("data-settings")) || "";
                s = JSON.parse(t), window.ht_ctc_chat_var = s
            } catch (e) {}
            0 === Object.keys(l).length && (l = {
                g_an_event_name: "click to chat",
                pixel_event_name: "Click to Chat by HoliThemes",
                pixel_event_type: "trackCustom",
                g_an_params: ["g_an_param_1", "g_an_param_2", "g_an_param_3"],
                g_an_param_1: {
                    key: "number",
                    value: "{number}"
                },
                g_an_param_2: {
                    key: "title",
                    value: "{title}"
                },
                g_an_param_3: {
                    key: "url",
                    value: "{url}"
                },
                pixel_params: ["pixel_param_1", "pixel_param_2", "pixel_param_3", "pixel_param_4"],
                pixel_param_1: {
                    key: "Category",
                    value: "Click to Chat for WhatsApp"
                },
                pixel_param_2: {
                    key: "return_type",
                    value: "chat"
                },
                pixel_param_3: {
                    key: "ID",
                    value: "{number}"
                },
                pixel_param_4: {
                    key: "Title",
                    value: "{title}"
                }
            }, window.ht_ctc_variables = l), u()
        }() : u();
        var k = s.hook_v ? s.hook_v : ""
    })
})();