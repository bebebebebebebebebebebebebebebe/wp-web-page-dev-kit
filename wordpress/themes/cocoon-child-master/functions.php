<?php //子テーマ用関数
if ( !defined( 'ABSPATH' ) ) exit;

/**
 * LP Custom Templateのスタイル・スクリプトを無効化
 * page-lp.phpを使用しているページでCocoon/WordPress関連のアセットを全て削除
 */
function remove_assets_on_lp_template() {
  if ( ! is_page_template( 'page-lp.php' ) ) {
    return;
  }

  // 削除対象のハンドル名パターン
  $patterns_to_remove = array(
    'cocoon',              // Cocoon
    'icomoon',             // Cocoonアイコンフォント
    'font-awesome',        // Font Awesome
    'baguettebox',         // 画像ライトボックス
    'stickyfill',          // Stickyfillポリフィル
    'wp-block',            // WordPressブロック
    'global-styles',       // WordPressグローバルスタイル
    'classic-theme-styles' // WordPress クラシックテーマスタイル
  );

  // スタイルを削除
  global $wp_styles;
  if ( isset( $wp_styles->registered ) ) {
    foreach ( $wp_styles->registered as $handle => $style ) {
      foreach ( $patterns_to_remove as $pattern ) {
        if ( strpos( $handle, $pattern ) !== false ) {
          wp_dequeue_style( $handle );
          wp_deregister_style( $handle );
          break;
        }
      }
    }
  }

  // スクリプトを削除
  global $wp_scripts;
  if ( isset( $wp_scripts->registered ) ) {
    foreach ( $wp_scripts->registered as $handle => $script ) {
      foreach ( $patterns_to_remove as $pattern ) {
        if ( strpos( $handle, $pattern ) !== false ) {
          wp_dequeue_script( $handle );
          wp_deregister_script( $handle );
          break;
        }
      }
    }
  }
}
add_action( 'wp_enqueue_scripts', 'remove_assets_on_lp_template', 9999 );
