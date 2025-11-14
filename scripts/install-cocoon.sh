#!/bin/bash
set -e

# Cocoonテーマのインストールスクリプト（ホスト側実行用）
# このスクリプトはホストマシンで実行し、wordpress/themes/ディレクトリにテーマをインストールします
# コンテナ側では個別のボリュームマウントにより読み込まれます

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
THEMES_DIR="$PROJECT_ROOT/wordpress/themes"
COCOON_PARENT_DIR="$THEMES_DIR/cocoon-master"
COCOON_CHILD_DIR="$THEMES_DIR/cocoon-child-master"

echo "Cocoon テーマをインストールします..."
echo "インストール先: $THEMES_DIR"

# テーマディレクトリの作成
mkdir -p "$THEMES_DIR"

# 親テーマのインストール
if [ ! -d "$COCOON_PARENT_DIR" ]; then
    echo "Cocoon 親テーマが見つかりません。インストール中..."
    cd /tmp
    wget -q https://github.com/yhira/cocoon/archive/refs/heads/master.zip -O cocoon.zip
    unzip -q cocoon.zip
    mv cocoon-master "$THEMES_DIR/"
    rm cocoon.zip
    echo "✓ Cocoon 親テーマのインストールが完了しました！"
else
    echo "✓ Cocoon 親テーマは既に存在します。"
fi

# 子テーマのインストール
if [ ! -d "$COCOON_CHILD_DIR" ]; then
    echo "Cocoon 子テーマが見つかりません。インストール中..."
    cd /tmp

    if wget -q https://github.com/yhira/cocoon-child/archive/refs/heads/master.zip -O cocoon-child.zip; then
        echo "GitHub から Cocoon 子テーマをダウンロードしました..."
        unzip -q cocoon-child.zip
        mv cocoon-child-master "$THEMES_DIR/"
        rm cocoon-child.zip
        echo "✓ Cocoon 子テーマのインストールが完了しました！"
    else
        echo "GitHub からのダウンロードに失敗しました。最小限の子テーマを作成します..."
        mkdir -p "$COCOON_CHILD_DIR"
        cat > "$COCOON_CHILD_DIR/style.css" << 'EOF'
/*
Theme Name: Cocoon Child
Template: cocoon-master
Description: Cocoon用の子テーマ
Author: Cocoon
Version: 1.0.0
*/
EOF
        cat > "$COCOON_CHILD_DIR/functions.php" << 'EOF'
<?php
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array('parent-style') );
}
EOF
        echo "✓ 最小限の Cocoon 子テーマを作成しました！"
    fi
else
    echo "✓ Cocoon 子テーマは既に存在します。"
fi

# グループ書き込み権限を設定（WordPress管理画面からの編集を可能にする）
echo "ファイルパーミッションを設定中..."
chmod -R g+w "$THEMES_DIR/cocoon-child-master"
chmod -R g+w "$THEMES_DIR/cocoon-master" 2>/dev/null || true
echo "✓ パーミッション設定完了"

echo ""
echo "Cocoon テーマのセットアップが完了しました！"
echo ""
echo "次のステップ:"
echo "1. docker-compose up で WordPress を起動してください"
echo "2. http://localhost:8000 にアクセスしてください"
echo "3. WordPress 管理画面で Cocoon Child テーマを有効化してください"
