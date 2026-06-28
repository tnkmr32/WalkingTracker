/* @ds-bundle: {"format":3,"namespace":"WalkingTrackerDesignSystem_145207","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"DualStateButton","sourcePath":"components/buttons/DualStateButton.jsx"},{"name":"LabeledProgressItem","sourcePath":"components/cards/LabeledProgressItem.jsx"},{"name":"SessionCard","sourcePath":"components/cards/SessionCard.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Chip","sourcePath":"components/display/Chip.jsx"},{"name":"Divider","sourcePath":"components/display/Divider.jsx"},{"name":"Icon","sourcePath":"components/display/Icon.jsx"},{"name":"MetricItem","sourcePath":"components/display/MetricItem.jsx"},{"name":"CircularProgressIndicator","sourcePath":"components/feedback/CircularProgressIndicator.jsx"},{"name":"ConfirmDialog","sourcePath":"components/feedback/ConfirmDialog.jsx"},{"name":"LinearProgressBar","sourcePath":"components/feedback/LinearProgressBar.jsx"},{"name":"Snackbar","sourcePath":"components/feedback/Snackbar.jsx"},{"name":"BottomNavigationBar","sourcePath":"components/navigation/BottomNavigationBar.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"877f0fbbcbd3","components/buttons/DualStateButton.jsx":"739234c0bb41","components/cards/LabeledProgressItem.jsx":"9ff0f21c961b","components/cards/SessionCard.jsx":"4bd388ed9dd4","components/display/Badge.jsx":"eae5e9c8e5d3","components/display/Chip.jsx":"c17f3729df54","components/display/Divider.jsx":"9a8d1309bd29","components/display/Icon.jsx":"8cb87384efca","components/display/MetricItem.jsx":"007a53486a87","components/feedback/CircularProgressIndicator.jsx":"de4692dd7f38","components/feedback/ConfirmDialog.jsx":"7cfa84fda355","components/feedback/LinearProgressBar.jsx":"f22ff31beccf","components/feedback/Snackbar.jsx":"3c1415d7ab92","components/navigation/BottomNavigationBar.jsx":"50bf420ad8d0","components/navigation/TopBar.jsx":"6fbb79310612","ui_kits/walkingtracker/App.jsx":"e32c0602ebe8","ui_kits/walkingtracker/HistoryScreen.jsx":"c478a94e07ee","ui_kits/walkingtracker/MapCanvas.jsx":"c08eb7f3d389","ui_kits/walkingtracker/PermissionScreen.jsx":"f7f743fc5a7d","ui_kits/walkingtracker/PhoneFrame.jsx":"94608c39c336","ui_kits/walkingtracker/RecordingScreen.jsx":"57db5002bef8","ui_kits/walkingtracker/SessionDetailScreen.jsx":"86e12d8e55dc","ui_kits/walkingtracker/TraversalScreen.jsx":"6dccc8a85c4e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WalkingTrackerDesignSystem_145207 = window.WalkingTrackerDesignSystem_145207 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Material3 button — the app's three button atoms in one component
 * (FilledButton / OutlinedButton / TextButton), plus a tonal variant.
 * Pill-shaped (full radius), 40dp tall, label uses labelLarge.
 */
function Button({
  variant = "filled",
  size = "medium",
  icon,
  iconFilled = false,
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  children,
  style,
  ...rest
}) {
  const heights = {
    small: 32,
    medium: 40,
    large: 56
  };
  const height = heights[size] || 40;
  const palette = {
    filled: {
      bg: "var(--md-primary)",
      fg: "var(--md-on-primary)",
      border: "transparent",
      shadow: "var(--elevation-1)"
    },
    tonal: {
      bg: "var(--md-secondary-container)",
      fg: "var(--md-on-secondary-container)",
      border: "transparent",
      shadow: "none"
    },
    outlined: {
      bg: "transparent",
      fg: "var(--md-primary)",
      border: "var(--md-outline)",
      shadow: "none"
    },
    text: {
      bg: "transparent",
      fg: "var(--md-primary)",
      border: "transparent",
      shadow: "none"
    },
    error: {
      bg: "var(--md-error)",
      fg: "var(--md-on-error)",
      border: "transparent",
      shadow: "var(--elevation-1)"
    }
  }[variant] || {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      height: `${height}px`,
      padding: size === "large" ? "0 28px" : icon ? "0 20px 0 16px" : "0 24px",
      width: fullWidth ? "100%" : "auto",
      fontFamily: "var(--font-sans)",
      fontSize: size === "large" ? "var(--type-title-medium-size)" : "var(--type-label-large-size)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--type-label-large-tracking)",
      lineHeight: 1,
      color: palette.fg,
      background: palette.bg,
      border: `1px solid ${palette.border}`,
      borderRadius: "var(--radius-button)",
      boxShadow: disabled ? "none" : palette.shadow,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.38 : 1,
      transition: "box-shadow .18s ease, background-color .18s ease, opacity .18s ease",
      WebkitTapHighlightColor: "transparent",
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    className: "wt-icon" + (iconFilled ? " wt-icon--filled" : ""),
    "aria-hidden": "true",
    style: {
      fontSize: `${size === "large" ? 20 : 18}px`
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/DualStateButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DualStateButton (Molecule) — full-width record control that swaps appearance
 * and label between two states. Idle → primary "記録を開始する" (play);
 * recording → error "記録を停止する" (stop). Used on the recording screen overlay.
 */
function DualStateButton({
  active = false,
  idleLabel = "記録を開始する",
  activeLabel = "記録を停止する",
  idleIcon = "play_arrow",
  activeIcon = "stop",
  onClick,
  disabled = false,
  style,
  ...rest
}) {
  const fg = active ? "var(--md-on-error)" : "var(--md-on-primary)";
  const bg = active ? "var(--md-error)" : "var(--md-primary)";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    disabled: disabled,
    "aria-pressed": active,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      width: "100%",
      height: "var(--button-height-tall)",
      padding: "0 28px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--type-title-medium-size)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "0.1px",
      color: fg,
      background: bg,
      border: "none",
      borderRadius: "var(--radius-button)",
      boxShadow: disabled ? "none" : "var(--elevation-2)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.38 : 1,
      transition: "background-color .2s ease, box-shadow .2s ease",
      WebkitTapHighlightColor: "transparent",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "wt-icon wt-icon--filled",
    "aria-hidden": "true",
    style: {
      fontSize: "20px"
    }
  }, active ? activeIcon : idleIcon), active ? activeLabel : idleLabel);
}
Object.assign(__ds_scope, { DualStateButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/DualStateButton.jsx", error: String((e && e.message) || e) }); }

// components/cards/SessionCard.jsx
try { (() => {
/**
 * SessionCard (Organism) — one row in the history list. Shows the session date
 * (titleMedium) and a single sub-line of stats (歩数 ・ 距離 ・ 所要時間).
 * Tapping navigates to the session detail. Card shape, resting elevation 1.
 */
function SessionCard({
  date,
  steps,
  distance,
  duration,
  onClick,
  style
}) {
  const subline = [steps, distance, duration].filter(Boolean).join("　・　");
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      width: "100%",
      textAlign: "left",
      background: "var(--md-surface-container-lowest)",
      border: "1px solid var(--md-outline-variant)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      padding: "14px 16px",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      WebkitTapHighlightColor: "transparent",
      transition: "box-shadow .18s ease, background-color .18s ease",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "none",
      width: "40px",
      height: "40px",
      borderRadius: "var(--shape-full)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--md-primary-container)",
      color: "var(--md-on-primary-container)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wt-icon",
    "aria-hidden": "true",
    style: {
      fontSize: "22px"
    }
  }, "directions_walk")), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      gap: "2px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-title-medium-size)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--type-title-medium-tracking)",
      color: "var(--md-on-surface)"
    }
  }, date), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-medium-size)",
      color: "var(--md-on-surface-variant)",
      fontFeatureSettings: "var(--font-feature-tnum)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, subline)), /*#__PURE__*/React.createElement("span", {
    className: "wt-icon",
    "aria-hidden": "true",
    style: {
      flex: "none",
      fontSize: "24px",
      color: "var(--md-outline)"
    }
  }, "chevron_right"));
}
Object.assign(__ds_scope, { SessionCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/SessionCard.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
/**
 * Badge (Atom) — small count or status dot. Material3 badge: pill-shaped,
 * error-colored by default. Use `dot` for a status indicator with no number.
 */
function Badge({
  count,
  dot = false,
  color = "error",
  max = 99,
  style,
  children
}) {
  const palette = {
    error: {
      bg: "var(--md-error)",
      fg: "var(--md-on-error)"
    },
    primary: {
      bg: "var(--md-primary)",
      fg: "var(--md-on-primary)"
    },
    secondary: {
      bg: "var(--md-secondary)",
      fg: "var(--md-on-secondary)"
    },
    tertiary: {
      bg: "var(--md-tertiary)",
      fg: "var(--md-on-tertiary)"
    }
  }[color] || {};
  if (dot) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        width: "8px",
        height: "8px",
        borderRadius: "var(--shape-full)",
        background: palette.bg,
        ...style
      }
    });
  }
  const text = children != null ? children : typeof count === "number" && count > max ? `${max}+` : count;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "16px",
      height: "16px",
      padding: "0 4px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--type-label-small-size)",
      fontWeight: "var(--fw-medium)",
      lineHeight: 1,
      color: palette.fg,
      background: palette.bg,
      borderRadius: "var(--shape-full)",
      ...style
    }
  }, text);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Chip (Atom/Molecule) — Material3 filter/assist chip. Selected chips use the
 * secondary container fill (color.md: "選択されたタブ・チップ背景").
 */
function Chip({
  label,
  icon,
  selected = false,
  onClick,
  disabled = false,
  style,
  children,
  ...rest
}) {
  const bg = selected ? "var(--md-secondary-container)" : "transparent";
  const fg = selected ? "var(--md-on-secondary-container)" : "var(--md-on-surface-variant)";
  const border = selected ? "transparent" : "var(--md-outline)";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: onClick,
    disabled: disabled,
    "aria-pressed": selected,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      height: "32px",
      padding: icon || selected ? "0 14px 0 10px" : "0 14px",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--type-label-large-size)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "0.1px",
      color: fg,
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: "var(--radius-chip)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.38 : 1,
      transition: "background-color .15s ease, border-color .15s ease",
      WebkitTapHighlightColor: "transparent",
      ...style
    }
  }, rest), selected && /*#__PURE__*/React.createElement("span", {
    className: "wt-icon",
    "aria-hidden": "true",
    style: {
      fontSize: "18px"
    }
  }, "check"), icon && !selected && /*#__PURE__*/React.createElement("span", {
    className: "wt-icon",
    "aria-hidden": "true",
    style: {
      fontSize: "18px"
    }
  }, icon), label ?? children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Chip.jsx", error: String((e && e.message) || e) }); }

// components/display/Divider.jsx
try { (() => {
/**
 * Divider (Atom) — thin separator using the outline-variant color.
 * Horizontal by default; pass `vertical` for column separators.
 */
function Divider({
  vertical = false,
  inset = 0,
  style
}) {
  if (vertical) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        alignSelf: "stretch",
        width: "1px",
        background: "var(--md-outline-variant)",
        ...style
      }
    });
  }
  return /*#__PURE__*/React.createElement("hr", {
    style: {
      border: 0,
      height: "1px",
      background: "var(--md-outline-variant)",
      margin: 0,
      marginLeft: inset,
      marginRight: inset,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Divider.jsx", error: String((e && e.message) || e) }); }

// components/display/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Icon (Atom) — Material Symbols glyph wrapper. Defaults to 24dp, currentColor.
 * `filled` switches to the filled optical style.
 */
function Icon({
  name,
  size = 24,
  filled = false,
  color,
  label,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "wt-icon" + (filled ? " wt-icon--filled" : ""),
    role: label ? "img" : undefined,
    "aria-label": label || undefined,
    "aria-hidden": label ? undefined : "true",
    style: {
      fontSize: `${size}px`,
      color: color || "inherit",
      ...style
    }
  }, rest), name);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Icon.jsx", error: String((e && e.message) || e) }); }

// components/display/MetricItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MetricItem (Molecule) — a large numeric readout paired with its label.
 * Used in StatPanel on the recording screen (steps / distance / elapsed).
 * Value uses headlineMedium with tabular figures so the width never jumps.
 */
function MetricItem({
  value,
  unit,
  label,
  icon,
  align = "center",
  emphasis = "default",
  style,
  ...rest
}) {
  const valueColor = emphasis === "accent" ? "var(--md-primary)" : "var(--md-on-surface)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: align === "center" ? "center" : "flex-start",
      gap: "2px",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      color: "var(--md-on-surface-variant)"
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "wt-icon",
    "aria-hidden": "true",
    style: {
      fontSize: "16px"
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-label-medium-size)",
      fontWeight: "var(--fw-medium)",
      letterSpacing: "var(--type-label-medium-tracking)"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "3px",
      color: valueColor
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-headline-medium-size)",
      lineHeight: "var(--type-headline-medium-line)",
      fontWeight: "var(--fw-regular)",
      fontFeatureSettings: "var(--font-feature-tnum)"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-title-medium-size)",
      fontWeight: "var(--fw-regular)",
      color: "var(--md-on-surface-variant)"
    }
  }, unit)));
}
Object.assign(__ds_scope, { MetricItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/MetricItem.jsx", error: String((e && e.message) || e) }); }

// components/feedback/CircularProgressIndicator.jsx
try { (() => {
/**
 * CircularProgressIndicator (Atom) — indeterminate spinner (loading / GPS取得中).
 * Pure CSS rotation; primary-colored arc by default.
 */
function CircularProgressIndicator({
  size = 40,
  thickness = 4,
  color = "primary",
  style
}) {
  const stroke = {
    primary: "var(--md-primary)",
    secondary: "var(--md-secondary)",
    tertiary: "var(--md-tertiary)",
    onPrimary: "var(--md-on-primary)"
  }[color] || "var(--md-primary)";
  return /*#__PURE__*/React.createElement("span", {
    role: "progressbar",
    "aria-label": "\u8AAD\u307F\u8FBC\u307F\u4E2D",
    style: {
      display: "inline-block",
      width: `${size}px`,
      height: `${size}px`,
      border: `${thickness}px solid var(--md-primary-container)`,
      borderTopColor: stroke,
      borderRadius: "50%",
      animation: "wt-spin 0.9s linear infinite",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, "@keyframes wt-spin{to{transform:rotate(360deg)}}"));
}
Object.assign(__ds_scope, { CircularProgressIndicator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/CircularProgressIndicator.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ConfirmDialog.jsx
try { (() => {
/**
 * ConfirmDialog (Organism) — Material3 basic dialog for confirming a
 * destructive/irreversible action (記録停止時の確認). Renders its own scrim.
 */
function ConfirmDialog({
  open = true,
  icon,
  title,
  message,
  confirmLabel = "停止する",
  cancelLabel = "キャンセル",
  destructive = true,
  onConfirm,
  onCancel
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      position: "absolute",
      inset: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "color-mix(in srgb, var(--md-scrim) 32%, transparent)",
      fontFamily: "var(--font-sans)"
    },
    onClick: onCancel
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: "320px",
      background: "var(--md-surface-container-high)",
      borderRadius: "var(--radius-dialog)",
      boxShadow: "var(--shadow-dialog)",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: icon ? "center" : "flex-start",
      textAlign: icon ? "center" : "left"
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "wt-icon",
    "aria-hidden": "true",
    style: {
      fontSize: "24px",
      color: "var(--md-secondary)",
      marginBottom: "16px"
    }
  }, icon), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 16px",
      fontSize: "var(--type-headline-small-size)",
      lineHeight: "var(--type-headline-small-line)",
      fontWeight: "var(--fw-regular)",
      color: "var(--md-on-surface)"
    }
  }, title), message && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 24px",
      fontSize: "var(--type-body-medium-size)",
      lineHeight: "var(--type-body-medium-line)",
      color: "var(--md-on-surface-variant)"
    }
  }, message), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px",
      justifyContent: "flex-end",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "text",
    onClick: onCancel
  }, cancelLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: destructive ? "error" : "filled",
    onClick: onConfirm
  }, confirmLabel))));
}
Object.assign(__ds_scope, { ConfirmDialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ConfirmDialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/LinearProgressBar.jsx
try { (() => {
/**
 * LinearProgressBar (Atom) — horizontal determinate progress (踏破率).
 * Track uses the primary container, fill uses primary. value is 0–100.
 */
function LinearProgressBar({
  value = 0,
  height = 8,
  color = "primary",
  style
}) {
  const v = Math.max(0, Math.min(100, value));
  const fill = {
    primary: "var(--md-primary)",
    secondary: "var(--md-secondary)",
    tertiary: "var(--md-tertiary)"
  }[color] || "var(--md-primary)";
  const track = {
    primary: "var(--md-primary-container)",
    secondary: "var(--md-secondary-container)",
    tertiary: "var(--md-tertiary-container)"
  }[color] || "var(--md-primary-container)";
  return /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": Math.round(v),
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    style: {
      width: "100%",
      height: `${height}px`,
      background: track,
      borderRadius: "var(--shape-full)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${v}%`,
      height: "100%",
      background: fill,
      borderRadius: "var(--shape-full)",
      transition: "width .4s cubic-bezier(.2,0,0,1)"
    }
  }));
}
Object.assign(__ds_scope, { LinearProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/LinearProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/cards/LabeledProgressItem.jsx
try { (() => {
/**
 * LabeledProgressItem (Molecule) — a labeled value row over a progress bar,
 * used in the traversal summary. When `value`/`max` are given it shows a
 * "210 / 500 km" style readout and computes the bar; or pass `percent` directly.
 */
function LabeledProgressItem({
  label,
  value,
  max,
  unit,
  percent,
  color = "primary",
  style
}) {
  const pct = percent != null ? percent : max ? Math.round(value / max * 100) : 0;
  const readout = percent != null ? `${pct}%` : `${value}${unit ? " " + unit : ""}${max != null ? ` / ${max}${unit ? " " + unit : ""}` : ""}`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-title-small-size)",
      fontWeight: "var(--fw-medium)",
      color: "var(--md-on-surface)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-medium-size)",
      color: "var(--md-on-surface-variant)",
      fontFeatureSettings: "var(--font-feature-tnum)"
    }
  }, readout)), /*#__PURE__*/React.createElement(__ds_scope.LinearProgressBar, {
    value: pct,
    color: color
  }));
}
Object.assign(__ds_scope, { LabeledProgressItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/LabeledProgressItem.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Snackbar.jsx
try { (() => {
/**
 * Snackbar (Organism) — brief bottom-anchored message (error/success).
 * Uses the inverse surface per Material3. Optional single action button.
 */
function Snackbar({
  message,
  actionLabel,
  onAction,
  icon,
  variant = "default",
  style
}) {
  const accent = variant === "error" ? "var(--md-error)" : variant === "success" ? "var(--md-secondary)" : "var(--md-inverse-primary)";
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      minHeight: "48px",
      padding: "8px 12px 8px 16px",
      background: "var(--md-inverse-surface)",
      color: "var(--md-inverse-on-surface)",
      borderRadius: "var(--shape-xs)",
      boxShadow: "var(--elevation-3)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--type-body-medium-size)",
      lineHeight: "var(--type-body-medium-line)",
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "wt-icon",
    "aria-hidden": "true",
    style: {
      fontSize: "20px",
      color: accent
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, message), actionLabel && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      flex: "none",
      border: "none",
      background: "transparent",
      color: accent,
      fontFamily: "var(--font-sans)",
      fontSize: "var(--type-label-large-size)",
      fontWeight: "var(--fw-medium)",
      padding: "8px 12px",
      cursor: "pointer",
      borderRadius: "var(--shape-full)"
    }
  }, actionLabel));
}
Object.assign(__ds_scope, { Snackbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Snackbar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNavigationBar.jsx
try { (() => {
/**
 * BottomNavigationBar (Organism) — Material3 NavigationBar with the app's three
 * tabs (記録 / 踏破 / 履歴). Selected tab shows a pill-shaped active indicator
 * (secondary container) behind a filled icon. Pass `items` or use the default.
 */
const DEFAULT_ITEMS = [{
  key: "record",
  label: "記録",
  icon: "directions_walk"
}, {
  key: "traversal",
  label: "踏破",
  icon: "map"
}, {
  key: "history",
  label: "履歴",
  icon: "history"
}];
function BottomNavigationBar({
  items = DEFAULT_ITEMS,
  value,
  onChange,
  style
}) {
  const active = value ?? items[0]?.key;
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "stretch",
      height: "var(--bottom-nav-height)",
      background: "var(--md-surface-container)",
      boxShadow: "var(--shadow-nav)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, items.map(it => {
    const selected = it.key === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.key,
      type: "button",
      onClick: () => onChange && onChange(it.key),
      "aria-current": selected ? "page" : undefined,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        border: "none",
        background: "transparent",
        paddingTop: "12px",
        paddingBottom: "16px",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "64px",
        height: "32px",
        borderRadius: "var(--shape-full)",
        background: selected ? "var(--md-secondary-container)" : "transparent",
        transition: "background-color .2s ease"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "wt-icon" + (selected ? " wt-icon--filled" : ""),
      "aria-hidden": "true",
      style: {
        fontSize: "24px",
        color: selected ? "var(--md-on-secondary-container)" : "var(--md-on-surface-variant)"
      }
    }, it.icon)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--type-label-medium-size)",
        fontWeight: "var(--fw-medium)",
        letterSpacing: "var(--type-label-medium-tracking)",
        color: selected ? "var(--md-on-surface)" : "var(--md-on-surface-variant)"
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { BottomNavigationBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNavigationBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
/**
 * TopBar (Organism) — Material3 small TopAppBar for detail screens.
 * Optional back (navigation) icon + centered-left title using titleLarge.
 */
function TopBar({
  title,
  onBack,
  backIcon = "arrow_back",
  actions,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      height: "var(--top-app-bar-height)",
      padding: "0 4px 0 4px",
      background: "var(--md-surface)",
      fontFamily: "var(--font-sans)",
      ...style
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBack,
    "aria-label": "\u623B\u308B",
    style: {
      flex: "none",
      width: "48px",
      height: "48px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      borderRadius: "var(--shape-full)",
      color: "var(--md-on-surface)",
      WebkitTapHighlightColor: "transparent"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wt-icon",
    "aria-hidden": "true",
    style: {
      fontSize: "24px"
    }
  }, backIcon)), /*#__PURE__*/React.createElement("h1", {
    style: {
      flex: 1,
      margin: 0,
      paddingLeft: onBack ? 0 : "12px",
      fontSize: "var(--type-title-large-size)",
      lineHeight: "var(--type-title-large-line)",
      fontWeight: "var(--fw-regular)",
      color: "var(--md-on-surface)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, title), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "none",
      display: "flex",
      alignItems: "center",
      paddingRight: "4px"
    }
  }, actions));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/walkingtracker/App.jsx
try { (() => {
/**
 * App — orchestrates the WalkingTracker UI kit: permission gate → main shell
 * with bottom nav (記録 / 踏破 / 履歴), live recording timer, and history → detail.
 */
function App() {
  const DS = window.WalkingTrackerDesignSystem_145207;
  const {
    BottomNavigationBar
  } = DS;
  const K = window.WTKit;
  const [granted, setGranted] = React.useState(false);
  const [tab, setTab] = React.useState("record");
  const [detail, setDetail] = React.useState(null);

  // recording state
  const [recording, setRecording] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const [gpsReady, setGpsReady] = React.useState(false);
  React.useEffect(() => {
    if (!granted) return;
    const t = setTimeout(() => setGpsReady(true), 1400);
    return () => clearTimeout(t);
  }, [granted]);
  React.useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);
  const liveSteps = recording ? (1234 + elapsed * 18).toLocaleString() : "3,480";
  const liveDist = recording ? (0.9 + elapsed * 0.012).toFixed(1) : "2.4";
  const sessions = [{
    id: 1,
    date: "2026/06/27（金）",
    steps: "12,345 歩",
    distance: "8.7 km",
    duration: "45分",
    start: "09:12",
    end: "09:57",
    trace: "16,84 22,76 30,74 36,64 44,60 52,62 58,52 66,48 72,40 80,36"
  }, {
    id: 2,
    date: "2026/06/25（水）",
    steps: "8,200 歩",
    distance: "5.4 km",
    duration: "32分",
    start: "07:40",
    end: "08:12",
    trace: "20,80 28,78 34,68 42,64 48,54 56,52 62,44"
  }, {
    id: 3,
    date: "2026/06/24（火）",
    steps: "4,100 歩",
    distance: "2.8 km",
    duration: "18分",
    start: "18:05",
    end: "18:23",
    trace: "24,82 32,76 40,72 46,62 52,58"
  }, {
    id: 4,
    date: "2026/06/22（日）",
    steps: "16,980 歩",
    distance: "11.3 km",
    duration: "62分",
    start: "06:30",
    end: "07:32",
    trace: "12,86 20,80 28,80 34,70 42,66 50,66 58,56 66,52 74,44 82,40 90,30"
  }, {
    id: 5,
    date: "2026/06/20（金）",
    steps: "6,540 歩",
    distance: "4.2 km",
    duration: "26分",
    start: "12:10",
    end: "12:36",
    trace: "22,78 30,74 36,66 44,60 50,56"
  }];
  if (!granted) {
    return /*#__PURE__*/React.createElement(K.PermissionScreen, {
      onGrant: () => setGranted(true)
    });
  }
  if (detail) {
    return /*#__PURE__*/React.createElement(K.SessionDetailScreen, {
      session: detail,
      onBack: () => setDetail(null)
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: "flex",
      flexDirection: "column"
    }
  }, tab === "record" && /*#__PURE__*/React.createElement(K.RecordingScreen, {
    recording: recording,
    steps: liveSteps,
    distance: liveDist,
    elapsed: elapsed,
    gpsReady: gpsReady,
    onStart: () => {
      setElapsed(0);
      setRecording(true);
    },
    onStop: () => setRecording(false)
  }), tab === "traversal" && /*#__PURE__*/React.createElement(K.TraversalScreen, null), tab === "history" && /*#__PURE__*/React.createElement(K.HistoryScreen, {
    sessions: sessions,
    onOpen: s => setDetail(s)
  })), /*#__PURE__*/React.createElement(BottomNavigationBar, {
    value: tab,
    onChange: setTab
  }));
}
window.WTKit = Object.assign(window.WTKit || {}, {
  App
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/walkingtracker/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/walkingtracker/HistoryScreen.jsx
try { (() => {
/**
 * HIS001 HistoryScreen — title bar + scrollable list of SessionCards (date
 * descending). Tapping a card opens the session detail.
 */
function HistoryScreen({
  sessions,
  onOpen
}) {
  const DS = window.WalkingTrackerDesignSystem_145207;
  const {
    SessionCard,
    Chip
  } = DS;
  const [filter, setFilter] = React.useState("all");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 4px",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "8px 0 12px",
      fontSize: "var(--type-title-large-size)",
      fontWeight: 400,
      color: "var(--md-on-surface)"
    }
  }, "\u8A18\u9332\u5C65\u6B74"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    label: "\u3059\u3079\u3066",
    icon: "list",
    selected: filter === "all",
    onClick: () => setFilter("all")
  }), /*#__PURE__*/React.createElement(Chip, {
    label: "\u4ECA\u9031",
    icon: "event",
    selected: filter === "week",
    onClick: () => setFilter("week")
  }), /*#__PURE__*/React.createElement(Chip, {
    label: "\u4ECA\u6708",
    icon: "calendar_month",
    selected: filter === "month",
    onClick: () => setFilter("month")
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: "auto",
      padding: "12px 16px 16px",
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, sessions.map(s => /*#__PURE__*/React.createElement(SessionCard, {
    key: s.id,
    date: s.date,
    steps: s.steps,
    distance: s.distance,
    duration: s.duration,
    onClick: () => onOpen(s)
  }))));
}
window.WTKit = Object.assign(window.WTKit || {}, {
  HistoryScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/walkingtracker/HistoryScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/walkingtracker/MapCanvas.jsx
try { (() => {
/**
 * MapCanvas — a faux 国土地理院 topographic map for the UI kit (stands in for the
 * real OSMDroid map view). Cream paper, brown contour lines, a green vegetation
 * patch and a blue river, with optional trace polylines and a location marker.
 * Pure SVG data viz — not an icon/illustration asset.
 */
function MapCanvas({
  trace,
  // array of "x,y" points (0..100 viewBox) — current/detail trace
  traceColor = "var(--map-track-current)",
  pastTraces = [],
  // array of point-strings drawn faint (past sessions)
  segments = [],
  // [{ points: "x y x y…", done: bool }] for traversal
  location,
  // { x, y } location marker
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      background: "#F4EFE1",
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    preserveAspectRatio: "xMidYMid slice",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "#C9A36F",
    strokeWidth: "0.35",
    opacity: "0.55"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M-5,20 C20,10 40,28 60,18 S95,8 110,22"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-5,30 C20,22 42,38 60,28 S95,20 110,32"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-5,42 C22,34 44,50 62,40 S96,32 112,44"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-5,58 C24,50 46,64 64,54 S96,48 112,60"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-5,72 C24,66 48,78 66,70 S96,64 112,76"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-5,86 C24,82 48,92 66,84 S96,80 112,90"
  })), /*#__PURE__*/React.createElement("g", {
    fill: "none",
    stroke: "#BE9560",
    strokeWidth: "0.4",
    opacity: "0.6"
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "74",
    cy: "60",
    rx: "13",
    ry: "9"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "74",
    cy: "60",
    rx: "8.5",
    ry: "5.8"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "74",
    cy: "60",
    rx: "4.5",
    ry: "3"
  })), /*#__PURE__*/React.createElement("path", {
    d: "M2,62 C14,54 26,60 30,72 C32,84 20,92 8,90 C-2,88 -4,70 2,62 Z",
    fill: "#CFE3C6",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-5,8 C18,18 30,10 44,24 C58,38 50,56 64,70 C74,80 84,80 105,92",
    fill: "none",
    stroke: "#9CC8DE",
    strokeWidth: "1.6",
    opacity: "0.85",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("g", {
    stroke: "#D8C9AE",
    strokeWidth: "0.5",
    opacity: "0.9"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "36",
    y1: "-5",
    x2: "44",
    y2: "105"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "-5",
    y1: "48",
    x2: "105",
    y2: "40"
  })), segments.map((s, i) => /*#__PURE__*/React.createElement("polyline", {
    key: i,
    points: s.points,
    fill: "none",
    stroke: s.done ? "var(--map-traversed)" : "var(--map-untraversed)",
    strokeWidth: s.done ? 1.8 : 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), pastTraces.map((p, i) => /*#__PURE__*/React.createElement("polyline", {
    key: i,
    points: p,
    fill: "none",
    stroke: "var(--map-track-past)",
    strokeWidth: "1.1",
    opacity: "0.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), trace && /*#__PURE__*/React.createElement("polyline", {
    points: trace,
    fill: "none",
    stroke: traceColor,
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), location && /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    cx: location.x,
    cy: location.y,
    r: "5",
    fill: "var(--map-location-halo)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: location.x,
    cy: location.y,
    r: "2",
    fill: "var(--map-location)",
    stroke: "#fff",
    strokeWidth: "0.7"
  }))), children);
}
window.WTKit = Object.assign(window.WTKit || {}, {
  MapCanvas
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/walkingtracker/MapCanvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/walkingtracker/PermissionScreen.jsx
try { (() => {
/**
 * SET001 PermissionScreen — explains required permissions and requests them.
 * Centered icon, permission list, primary "permit" button, caution note.
 */
function PermissionScreen({
  onGrant
}) {
  const DS = window.WalkingTrackerDesignSystem_145207;
  const {
    Button
  } = DS;
  const perms = [{
    icon: "location_on",
    title: "位置情報（GPS取得）",
    desc: "歩いた経路を地図に記録します"
  }, {
    icon: "directions_walk",
    title: "身体活動（歩数計測）",
    desc: "歩数センサーから歩数を計測します"
  }, {
    icon: "notifications",
    title: "通知",
    desc: "バックグラウンド記録中の常駐通知に使用します"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: "16px 24px 28px",
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "88px",
      height: "88px",
      borderRadius: "var(--shape-full)",
      background: "var(--md-primary-container)",
      color: "var(--md-on-primary-container)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wt-icon wt-icon--filled",
    style: {
      fontSize: "46px"
    }
  }, "hiking"))), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "0 0 6px",
      textAlign: "center",
      fontSize: "var(--type-headline-small-size)",
      lineHeight: "var(--type-headline-small-line)",
      fontWeight: 400,
      color: "var(--md-on-surface)"
    }
  }, "\u3053\u306E\u30A2\u30D7\u30EA\u306F\u4EE5\u4E0B\u306E\u6A29\u9650\u304C\u5FC5\u8981\u3067\u3059"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 28px",
      textAlign: "center",
      fontSize: "var(--type-body-medium-size)",
      color: "var(--md-on-surface-variant)"
    }
  }, "\u6B69\u884C\u306E\u8A18\u9332\u306E\u305F\u3081\u3001\u8D77\u52D5\u6642\u306B\u6A29\u9650\u3092\u78BA\u8A8D\u3057\u307E\u3059\u3002"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, perms.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.title,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "14px",
      background: "var(--md-surface-container-low)",
      borderRadius: "var(--shape-md)",
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wt-icon",
    style: {
      fontSize: "24px",
      color: "var(--md-secondary)",
      flex: "none",
      marginTop: "1px"
    }
  }, p.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-title-small-size)",
      fontWeight: 500,
      color: "var(--md-on-surface)"
    }
  }, p.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-body-small-size)",
      lineHeight: "var(--type-body-small-line)",
      color: "var(--md-on-surface-variant)",
      marginTop: "2px"
    }
  }, p.desc)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "24px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "filled",
    size: "large",
    fullWidth: true,
    icon: "check",
    onClick: onGrant
  }, "\u6A29\u9650\u3092\u8A31\u53EF\u3059\u308B"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "14px 0 0",
      textAlign: "center",
      fontSize: "var(--type-body-small-size)",
      lineHeight: "var(--type-body-small-line)",
      color: "var(--md-on-surface-variant)"
    }
  }, "\u203B \u62D2\u5426\u3057\u305F\u5834\u5408\u3001\u4E00\u90E8\u6A5F\u80FD\u304C\u4F7F\u7528\u3067\u304D\u307E\u305B\u3093")));
}
window.WTKit = Object.assign(window.WTKit || {}, {
  PermissionScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/walkingtracker/PermissionScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/walkingtracker/PhoneFrame.jsx
try { (() => {
/**
 * PhoneFrame — Android device shell (~412×892 dp) with a Material status bar.
 * Children render inside the screen area. Used to host the UI-kit screens.
 */
function PhoneFrame({
  children,
  statusDark = false,
  title
}) {
  const fg = statusDark ? "#fff" : "var(--md-on-surface)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "412px",
      height: "892px",
      background: "#0c0a08",
      borderRadius: "44px",
      padding: "11px",
      boxShadow: "0 30px 70px rgba(31,27,22,.34), 0 4px 12px rgba(31,27,22,.22)",
      boxSizing: "border-box",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "var(--md-background)",
      borderRadius: "34px",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "34px",
      flex: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      color: fg,
      fontSize: "13px",
      fontWeight: 500,
      position: "relative",
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFeatureSettings: '"tnum"'
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: "9px",
      transform: "translateX(-50%)",
      width: "84px",
      height: "20px",
      background: "#0c0a08",
      borderRadius: "12px"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      gap: "6px",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wt-icon",
    style: {
      fontSize: "16px"
    }
  }, "signal_cellular_alt"), /*#__PURE__*/React.createElement("span", {
    className: "wt-icon",
    style: {
      fontSize: "16px"
    }
  }, "wifi"), /*#__PURE__*/React.createElement("span", {
    className: "wt-icon wt-icon--filled",
    style: {
      fontSize: "16px"
    }
  }, "battery_full"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      position: "relative",
      display: "flex",
      flexDirection: "column"
    }
  }, children)));
}
window.WTKit = Object.assign(window.WTKit || {}, {
  PhoneFrame
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/walkingtracker/PhoneFrame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/walkingtracker/RecordingScreen.jsx
try { (() => {
/**
 * WLK001 RecordingScreen — map overlay with the live stat panel and the
 * start/stop control. Idle shows 今日の歩数/距離; recording adds 経過 and a
 * growing trace. Stopping opens a ConfirmDialog (destructive).
 */
function RecordingScreen({
  recording,
  steps,
  distance,
  elapsed,
  gpsReady,
  onStart,
  onStop
}) {
  const DS = window.WalkingTrackerDesignSystem_145207;
  const {
    MetricItem,
    DualStateButton,
    Divider,
    ConfirmDialog,
    CircularProgressIndicator,
    Snackbar
  } = DS;
  const {
    MapCanvas
  } = window.WTKit;
  const [confirm, setConfirm] = React.useState(false);

  // trace grows with elapsed seconds (demo)
  const full = "18,82 22,74 28,72 31,64 38,60 44,62 50,54 55,50 58,44 64,42 70,38";
  const pts = full.split(" ");
  const shown = recording ? pts.slice(0, Math.min(pts.length, 3 + Math.floor(elapsed / 2))).join(" ") : null;
  const loc = recording ? (() => {
    const a = (shown || pts[0]).split(" ");
    const last = a[a.length - 1].split(",");
    return {
      x: +last[0],
      y: +last[1]
    };
  })() : {
    x: 22,
    y: 74
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement(MapCanvas, {
    trace: shown,
    traceColor: "var(--map-track-current)",
    pastTraces: ["8,88 14,80 20,82 24,72", "60,30 66,26 72,28 78,20"],
    location: gpsReady ? loc : null
  }), !gpsReady && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      background: "var(--md-surface)",
      borderRadius: "var(--shape-full)",
      padding: "8px 16px 8px 12px",
      boxShadow: "var(--shadow-overlay)",
      fontSize: "var(--type-label-large-size)",
      color: "var(--md-on-surface)"
    }
  }, /*#__PURE__*/React.createElement(CircularProgressIndicator, {
    size: 18,
    thickness: 3
  }), "GPS\u4FE1\u53F7\u3092\u53D6\u5F97\u4E2D\u2026")), recording && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      left: 16,
      zIndex: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "var(--md-error)",
      color: "var(--md-on-error)",
      borderRadius: "var(--shape-full)",
      padding: "6px 14px 6px 12px",
      boxShadow: "var(--shadow-overlay)",
      fontSize: "var(--type-label-medium-size)",
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#fff"
    }
  }), "\u8A18\u9332\u4E2D")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 12,
      right: 12,
      bottom: 12,
      zIndex: 4,
      background: "var(--md-surface)",
      borderRadius: "var(--radius-sheet)",
      boxShadow: "var(--shadow-overlay)",
      padding: "18px 18px 18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginBottom: "16px"
    }
  }, recording ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetricItem, {
    label: "\u6B69\u6570",
    value: steps,
    unit: "\u6B69",
    icon: "directions_walk",
    emphasis: "accent"
  }), /*#__PURE__*/React.createElement(Divider, {
    vertical: true
  }), /*#__PURE__*/React.createElement(MetricItem, {
    label: "\u8DDD\u96E2",
    value: distance,
    unit: "km",
    icon: "straighten"
  }), /*#__PURE__*/React.createElement(Divider, {
    vertical: true
  }), /*#__PURE__*/React.createElement(MetricItem, {
    label: "\u7D4C\u904E",
    value: elapsedFmt(elapsed),
    icon: "timer"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetricItem, {
    label: "\u4ECA\u65E5\u306E\u6B69\u6570",
    value: steps,
    unit: "\u6B69",
    icon: "directions_walk"
  }), /*#__PURE__*/React.createElement(Divider, {
    vertical: true
  }), /*#__PURE__*/React.createElement(MetricItem, {
    label: "\u4ECA\u65E5\u306E\u8DDD\u96E2",
    value: distance,
    unit: "km",
    icon: "straighten"
  }))), /*#__PURE__*/React.createElement(DualStateButton, {
    active: recording,
    onClick: () => recording ? setConfirm(true) : onStart()
  })), /*#__PURE__*/React.createElement(ConfirmDialog, {
    open: confirm,
    icon: "stop_circle",
    title: "\u8A18\u9332\u3092\u505C\u6B62\u3057\u307E\u3059\u304B\uFF1F",
    message: "\u73FE\u5728\u306E\u30BB\u30C3\u30B7\u30E7\u30F3\u3092\u4FDD\u5B58\u3057\u3066\u8A18\u9332\u3092\u7D42\u4E86\u3057\u307E\u3059\u3002",
    confirmLabel: "\u505C\u6B62\u3059\u308B",
    onConfirm: () => {
      setConfirm(false);
      onStop();
    },
    onCancel: () => setConfirm(false)
  }));
}
function elapsedFmt(s) {
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor(s % 3600 / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
}
window.WTKit = Object.assign(window.WTKit || {}, {
  RecordingScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/walkingtracker/RecordingScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/walkingtracker/SessionDetailScreen.jsx
try { (() => {
/**
 * HIS002 SessionDetailScreen — TopBar (back + date) over the session's trace
 * map and a stats block (歩数 / 距離 / 所要時間 / 開始 / 終了).
 */
function SessionDetailScreen({
  session,
  onBack
}) {
  const DS = window.WalkingTrackerDesignSystem_145207;
  const {
    TopBar,
    Divider
  } = DS;
  const {
    MapCanvas
  } = window.WTKit;
  const s = session;
  const rows = [{
    l: "歩数",
    v: s.steps
  }, {
    l: "距離",
    v: s.distance
  }, {
    l: "所要時間",
    v: s.duration
  }, {
    l: "開始時刻",
    v: s.start
  }, {
    l: "終了時刻",
    v: s.end
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: s.date,
    onBack: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "46%",
      position: "relative",
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement(MapCanvas, {
    trace: s.trace,
    traceColor: "var(--map-track-current)",
    location: null
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: "auto",
      padding: "8px 20px 20px"
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: r.l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      padding: "14px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-large-size)",
      color: "var(--md-on-surface-variant)"
    }
  }, r.l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-title-medium-size)",
      fontWeight: 500,
      color: "var(--md-on-surface)",
      fontFeatureSettings: '"tnum"'
    }
  }, r.v)), i < rows.length - 1 && /*#__PURE__*/React.createElement(Divider, null)))));
}
window.WTKit = Object.assign(window.WTKit || {}, {
  SessionDetailScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/walkingtracker/SessionDetailScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/walkingtracker/TraversalScreen.jsx
try { (() => {
/**
 * TRV001 TraversalScreen — old-highway (旧街道) progress: name, percent bar,
 * 踏破済み/全体/あと summary, and a map with walked (green) vs unwalked (grey)
 * segments overlaid on the topographic map.
 */
function TraversalScreen() {
  const DS = window.WalkingTrackerDesignSystem_145207;
  const {
    LinearProgressBar,
    LabeledProgressItem
  } = DS;
  const {
    MapCanvas
  } = window.WTKit;
  const total = 500,
    done = 210;
  const pct = Math.round(done / total * 100);
  const segments = [{
    points: "10,86 18,80 26,82 33,72 40,68",
    done: true
  }, {
    points: "40,68 47,70 53,60 58,56",
    done: true
  }, {
    points: "58,56 62,48 68,46 73,40",
    done: false
  }, {
    points: "73,40 80,36 86,38 92,28",
    done: false
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 20px 18px",
      background: "var(--md-background)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wt-icon",
    style: {
      fontSize: "26px",
      color: "var(--md-primary)"
    }
  }, "route"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: "var(--type-headline-small-size)",
      fontWeight: 400,
      color: "var(--md-on-surface)"
    }
  }, "\u6771\u6D77\u9053")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-title-small-size)",
      fontWeight: 500,
      color: "var(--md-on-surface)"
    }
  }, "\u8E0F\u7834\u9032\u6357"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-headline-small-size)",
      lineHeight: 1,
      fontWeight: 400,
      color: "var(--md-primary)",
      fontFeatureSettings: '"tnum"'
    }
  }, pct, "%")), /*#__PURE__*/React.createElement(LinearProgressBar, {
    value: pct,
    height: 10
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      marginTop: "18px"
    }
  }, [{
    l: "踏破済み",
    v: done,
    c: "var(--md-secondary)"
  }, {
    l: "全体距離",
    v: total,
    c: "var(--md-on-surface)"
  }, {
    l: "あと",
    v: total - done,
    c: "var(--md-tertiary)"
  }].map(x => /*#__PURE__*/React.createElement("div", {
    key: x.l,
    style: {
      flex: 1,
      background: "var(--md-surface-container-low)",
      borderRadius: "var(--shape-md)",
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-label-medium-size)",
      fontWeight: 500,
      color: "var(--md-on-surface-variant)",
      marginBottom: "4px"
    }
  }, x.l), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "3px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-headline-small-size)",
      lineHeight: 1,
      fontWeight: 400,
      color: x.c,
      fontFeatureSettings: '"tnum"'
    }
  }, x.v), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-small-size)",
      color: "var(--md-on-surface-variant)"
    }
  }, "km")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: "relative",
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(MapCanvas, {
    segments: segments,
    location: {
      x: 58,
      y: 56
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 14,
      left: 16,
      background: "var(--md-surface)",
      borderRadius: "var(--shape-sm)",
      boxShadow: "var(--shadow-card)",
      padding: "10px 14px",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement(Legend, {
    color: "var(--map-traversed)",
    label: "\u8E0F\u7834\u6E08\u307F\u533A\u9593"
  }), /*#__PURE__*/React.createElement(Legend, {
    color: "var(--map-untraversed)",
    label: "\u672A\u8E0F\u533A\u9593"
  }))));
}
function Legend({
  color,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 4,
      borderRadius: 2,
      background: color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-small-size)",
      color: "var(--md-on-surface)"
    }
  }, label));
}
window.WTKit = Object.assign(window.WTKit || {}, {
  TraversalScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/walkingtracker/TraversalScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.DualStateButton = __ds_scope.DualStateButton;

__ds_ns.LabeledProgressItem = __ds_scope.LabeledProgressItem;

__ds_ns.SessionCard = __ds_scope.SessionCard;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.MetricItem = __ds_scope.MetricItem;

__ds_ns.CircularProgressIndicator = __ds_scope.CircularProgressIndicator;

__ds_ns.ConfirmDialog = __ds_scope.ConfirmDialog;

__ds_ns.LinearProgressBar = __ds_scope.LinearProgressBar;

__ds_ns.Snackbar = __ds_scope.Snackbar;

__ds_ns.BottomNavigationBar = __ds_scope.BottomNavigationBar;

__ds_ns.TopBar = __ds_scope.TopBar;

})();
